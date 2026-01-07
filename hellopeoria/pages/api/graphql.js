import { graphql, buildSchema } from "graphql";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

const schema = buildSchema(`
  type Address {
    formattedAddress: String
    lat: Float
    lng: Float
  }

  type Category {
    id: ID
    name: String
  }

  type Path {
    id: ID
    name: String
  }

  type PeoriaPlace {
    id: ID!
    name: String
    description: String
    address: Address
    altAddress: String
    image: String
    largeImage: String
    mainCategory: Category
    mainPath: Path
    tags: String
    featured: Boolean
    category: String
    path: String
  }

  type PeoriaFavoriteList {
    id: ID!
    url: String
    places: [PeoriaPlace]
    postedAt: String
  }

  enum PathNameType {
    Free
    Family
    Foodie
    Nightlife
    Local
    Sightseeing
    Outdoor
    Events
  }

  enum CategoryNameType {
    Cafe
    Coffee
    Restaurant
    Bar
    Breakfast
    Mural
    Attraction
    Shop
    Entertainment
  }

  input PlaceWhereInput {
    id: ID
    mainCategory: CategoryWhereInput
    mainPath: PathWhereInput
    featured: Boolean
    name_contains_i: String
    description_contains_i: String
    tags_contains_i: String
    AND: [PlaceWhereInput]
    OR: [PlaceWhereInput]
  }

  input CategoryWhereInput {
    name: CategoryNameType
  }

  input PathWhereInput {
    name: PathNameType
  }

  input PlaceWhereUniqueInput {
    id: ID!
  }

  input ListWhereInput {
    url: String
  }

  enum SortOrder {
    name_ASC
    name_DESC
    description_ASC
    description_DESC
  }

  type Query {
    allPeoriaPlaces(where: PlaceWhereInput, sortBy: SortOrder, first: Int): [PeoriaPlace]
    PeoriaPlace(where: PlaceWhereUniqueInput!): PeoriaPlace
    allPeoriaFavoriteLists(where: ListWhereInput): [PeoriaFavoriteList]
  }
`);

// Helper to build MongoDB filter from GraphQL where input
function buildPlaceFilter(where, categories, paths) {
  if (!where) return {};

  const filter = {};
  const conditions = [];

  // Handle direct ID lookup
  if (where.id) {
    try {
      filter._id = new ObjectId(where.id);
    } catch (e) {
      filter._id = where.id;
    }
  }

  // Handle featured filter
  if (where.featured !== undefined) {
    conditions.push({ featured: where.featured });
  }

  // Handle category filter
  if (where.mainCategory && where.mainCategory.name) {
    const categoryName = where.mainCategory.name;
    const category = categories.find((c) => c.name === categoryName);
    if (category) {
      conditions.push({ mainCategory: category._id });
    }
  }

  // Handle path filter
  if (where.mainPath && where.mainPath.name) {
    const pathName = where.mainPath.name;

    const path = paths.find((p) => p.name === pathName);

    if (path) {
      conditions.push({ mainPath: path._id });
    }
  }

  // Handle text search (case-insensitive contains)
  if (where.name_contains_i) {
    conditions.push({ name: { $regex: where.name_contains_i, $options: "i" } });
  }
  if (where.description_contains_i) {
    conditions.push({
      description: { $regex: where.description_contains_i, $options: "i" },
    });
  }
  if (where.tags_contains_i) {
    conditions.push({ tags: { $regex: where.tags_contains_i, $options: "i" } });
  }

  // Handle AND conditions
  if (where.AND && where.AND.length > 0) {
    const andConditions = where.AND.map((w) =>
      buildPlaceFilter(w, categories, paths)
    );
    conditions.push({ $and: andConditions });
  }

  // Handle OR conditions
  if (where.OR && where.OR.length > 0) {
    const orConditions = where.OR.map((w) =>
      buildPlaceFilter(w, categories, paths)
    );
    conditions.push({ $or: orConditions });
  }

  if (conditions.length > 0) {
    if (conditions.length === 1) {
      return { ...filter, ...conditions[0] };
    }
    return { ...filter, $and: conditions };
  }

  return filter;
}

// Helper to build sort object
function buildSort(sortBy) {
  if (!sortBy) return { name: 1 };

  const parts = sortBy.split("_");
  const order = parts.pop();
  const field = parts.join("_");
  return { [field]: order === "ASC" ? 1 : -1 };
}

// Helper to resolve a place with its relationships
function resolvePlace(place, categories, paths) {
  if (!place) return null;

  let mainCategory = null;
  let mainPath = null;

  if (place.mainCategory) {
    mainCategory = categories.find((c) => {
      if (c._id && place.mainCategory) {
        return c._id.equals
          ? c._id.equals(place.mainCategory)
          : c._id.toString() === place.mainCategory.toString();
      }
      return false;
    });
    if (mainCategory) {
      mainCategory = {
        id: mainCategory._id.toString(),
        name: mainCategory.name,
      };
    }
  }

  if (place.mainPath) {
    mainPath = paths.find((p) => {
      if (p._id && place.mainPath) {
        return p._id.equals
          ? p._id.equals(place.mainPath)
          : p._id.toString() === place.mainPath.toString();
      }
      return false;
    });
    if (mainPath) {
      mainPath = { id: mainPath._id.toString(), name: mainPath.name };
    }
  }

  return {
    id: place._id.toString(),
    name: place.name,
    description: place.description,
    address: place.address,
    altAddress: place.altAddress,
    image: place.image,
    largeImage: place.largeImage,
    mainCategory,
    mainPath,
    tags: place.tags,
    featured: place.featured,
    category: place.category,
    path: place.path,
  };
}

const root = {
  allPeoriaPlaces: async ({ where, sortBy, first }) => {
    const { db } = await connectToDatabase();

    // Debug: list all collections
    const collections = await db.listCollections().toArray();
    console.log("Available collections:", collections.map((c) => c.name));

    // Load categories and paths for filtering
    const categories = await db
      .collection("categories")
      .find({})
      .toArray();
    const paths = await db
      .collection("paths")
      .find({})
      .toArray();

    console.log("Categories count:", categories.length);
    console.log("Paths count:", paths.length);

    const filter = buildPlaceFilter(where, categories, paths);
    const sort = buildSort(sortBy);

    let query = db
      .collection("peoriaplaces")
      .find(filter)
      .sort(sort);

    if (first) {
      query = query.limit(first);
    }

    const places = await query.toArray();

    return places.map((place) => resolvePlace(place, categories, paths));
  },

  PeoriaPlace: async ({ where }) => {
    const { db } = await connectToDatabase();

    let placeId;
    try {
      placeId = new ObjectId(where.id);
    } catch (e) {
      placeId = where.id;
    }

    const place = await db.collection("peoriaplaces").findOne({ _id: placeId });

    if (!place) return null;

    const categories = await db
      .collection("categories")
      .find({})
      .toArray();
    const paths = await db
      .collection("paths")
      .find({})
      .toArray();

    return resolvePlace(place, categories, paths);
  },

  allPeoriaFavoriteLists: async ({ where }) => {
    const { db } = await connectToDatabase();

    const filter = where && where.url ? { url: where.url } : {};
    const lists = await db
      .collection("peoriafavoritelists")
      .find(filter)
      .toArray();

    const categories = await db
      .collection("categories")
      .find({})
      .toArray();
    const paths = await db
      .collection("paths")
      .find({})
      .toArray();

    const resolvedLists = await Promise.all(
      lists.map(async (list) => {
        let places = [];

        if (list.places && list.places.length > 0) {
          const placeIds = list.places.map((id) => {
            try {
              return new ObjectId(id);
            } catch (e) {
              return id;
            }
          });

          const placeDocs = await db
            .collection("peoriaplaces")
            .find({ _id: { $in: placeIds } })
            .toArray();

          places = placeDocs.map((place) =>
            resolvePlace(place, categories, paths)
          );
        }

        return {
          id: list._id.toString(),
          url: list.url,
          places,
          postedAt: list.postedAt
            ? list.postedAt.toISOString
              ? list.postedAt.toISOString()
              : list.postedAt
            : null,
        };
      })
    );

    return resolvedLists;
  },
};

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { query, variables } = req.body;
    // console.log('GraphQL query:', query);
    // console.log('GraphQL variables:', variables);

    const result = await graphql(schema, query, root, null, variables);
    // console.log('GraphQL result:', JSON.stringify(result, null, 2));

    res.status(200).json(result);
  } catch (error) {
    console.error("GraphQL error:", error.message);
    console.error("Stack:", error.stack);
    res
      .status(500)
      .json({ errors: [{ message: error.message, stack: error.stack }] });
  }
}
