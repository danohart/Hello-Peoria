import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

// Helper to serialize address (remove MongoDB ObjectId)
function serializeAddress(address) {
  if (!address) return null;
  return {
    formattedAddress: address.formattedAddress || null,
    lat: address.lat || null,
    lng: address.lng || null,
  };
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
    name: place.name || null,
    description: place.description || null,
    address: serializeAddress(place.address),
    altAddress: place.altAddress || null,
    image: place.image || null,
    largeImage: place.largeImage || null,
    mainCategory: mainCategory || null,
    mainPath: mainPath || null,
    tags: place.tags || null,
    featured: place.featured || false,
    firstFriday: place.firstFriday || false,
    category: place.category || null,
    path: place.path || null,
    unlisted: place.unlisted || false,
  };
}

// Get all places sorted by name (excludes unlisted)
export async function getAllPlaces() {
  const { db } = await connectToDatabase();

  const categories = await db.collection('placecategories').find({}).toArray();
  const paths = await db.collection('paths').find({}).toArray();

  const places = await db
    .collection('peoriaplaces')
    .find({ unlisted: { $ne: true } })
    .sort({ name: 1 })
    .toArray();

  return places.map((place) => resolvePlace(place, categories, paths));
}

// Get all places including unlisted (for admin)
export async function getAllPlacesIncludingUnlisted() {
  const { db } = await connectToDatabase();

  const categories = await db.collection('placecategories').find({}).toArray();
  const paths = await db.collection('paths').find({}).toArray();

  const places = await db
    .collection('peoriaplaces')
    .find({})
    .sort({ name: 1 })
    .toArray();

  return places.map((place) => resolvePlace(place, categories, paths));
}

// Get places by path name (Free, Family, Foodie, etc.)
export async function getPlacesByPath(pathName) {
  const { db } = await connectToDatabase();

  const categories = await db.collection('placecategories').find({}).toArray();
  const paths = await db.collection('paths').find({}).toArray();

  const path = paths.find((p) => p.name === pathName);
  if (!path) return [];

  const places = await db
    .collection('peoriaplaces')
    .find({ mainPath: path._id, unlisted: { $ne: true } })
    .sort({ name: 1 })
    .toArray();

  return places.map((place) => resolvePlace(place, categories, paths));
}

// Get featured places by path name
export async function getFeaturedPlacesByPath(pathName, limit = 8) {
  const { db } = await connectToDatabase();

  const categories = await db.collection('placecategories').find({}).toArray();
  const paths = await db.collection('paths').find({}).toArray();

  const path = paths.find((p) => p.name === pathName);
  if (!path) return [];

  const places = await db
    .collection('peoriaplaces')
    .find({ mainPath: path._id, featured: true, unlisted: { $ne: true } })
    .sort({ description: -1 })
    .limit(limit)
    .toArray();

  return places.map((place) => resolvePlace(place, categories, paths));
}

// Get places by category name (Cafe, Restaurant, Bar, etc.)
export async function getPlacesByCategory(categoryName) {
  const { db } = await connectToDatabase();

  const categories = await db.collection('placecategories').find({}).toArray();
  const paths = await db.collection('paths').find({}).toArray();

  const category = categories.find((c) => c.name === categoryName);
  if (!category) return [];

  const places = await db
    .collection('peoriaplaces')
    .find({ mainCategory: category._id, unlisted: { $ne: true } })
    .sort({ name: 1 })
    .toArray();

  return places.map((place) => resolvePlace(place, categories, paths));
}

// Get a single place by ID (excludes unlisted)
export async function getPlaceById(id) {
  const { db } = await connectToDatabase();

  let placeId;
  try {
    placeId = new ObjectId(id);
  } catch (e) {
    placeId = id;
  }

  const place = await db.collection('peoriaplaces').findOne({
    _id: placeId,
    unlisted: { $ne: true }
  });
  if (!place) return null;

  const categories = await db.collection('placecategories').find({}).toArray();
  const paths = await db.collection('paths').find({}).toArray();

  return resolvePlace(place, categories, paths);
}

// Get all place IDs for static paths (excludes unlisted)
export async function getAllPlaceIds() {
  const { db } = await connectToDatabase();

  const places = await db
    .collection('peoriaplaces')
    .find({ unlisted: { $ne: true } }, { projection: { _id: 1 } })
    .toArray();

  return places.map((place) => place._id.toString());
}

// Get all categories
export async function getAllCategories() {
  const { db } = await connectToDatabase();
  const categories = await db.collection('placecategories').find({}).toArray();
  return categories.map((c) => ({ id: c._id.toString(), name: c.name }));
}

// Get all paths
export async function getAllPaths() {
  const { db } = await connectToDatabase();
  const paths = await db.collection('paths').find({}).toArray();
  return paths.map((p) => ({ id: p._id.toString(), name: p.name }));
}

// Get a list by URL slug
export async function getListByUrl(url) {
  const { db } = await connectToDatabase();

  const list = await db.collection('peoriafavoritelists').findOne({ url });
  if (!list) return null;

  const categories = await db.collection('placecategories').find({}).toArray();
  const paths = await db.collection('paths').find({}).toArray();

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
      .collection('peoriaplaces')
      .find({ _id: { $in: placeIds }, unlisted: { $ne: true } })
      .toArray();

    places = placeDocs.map((place) => resolvePlace(place, categories, paths));
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
}

// Get all list URLs for static paths
export async function getAllListUrls() {
  const { db } = await connectToDatabase();

  const lists = await db
    .collection('peoriafavoritelists')
    .find({}, { projection: { url: 1 } })
    .toArray();

  return lists.map((list) => list.url).filter(Boolean);
}

// Search places by text (for breakfast places)
export async function searchPlaces(searchTerm) {
  const { db } = await connectToDatabase();

  const categories = await db.collection('placecategories').find({}).toArray();
  const paths = await db.collection('paths').find({}).toArray();

  const places = await db
    .collection('peoriaplaces')
    .find({
      $and: [
        { unlisted: { $ne: true } },
        {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { tags: { $regex: searchTerm, $options: 'i' } },
          ],
        },
      ],
    })
    .sort({ name: 1 })
    .toArray();

  return places.map((place) => resolvePlace(place, categories, paths));
}

// Update place unlisted status
export async function updatePlaceUnlisted(id, unlisted) {
  const { db } = await connectToDatabase();

  let placeId;
  try {
    placeId = new ObjectId(id);
  } catch (e) {
    placeId = id;
  }

  const result = await db.collection('peoriaplaces').updateOne(
    { _id: placeId },
    { $set: { unlisted: unlisted } }
  );

  return result.modifiedCount > 0;
}
