import { useRouter } from "next/router";

export default function FavoritesList({ favList, addOrRemoveToFavList }) {
  const router = useRouter();

  function saveList() {
    // Encode place IDs in the URL
    const placeIds = favList.map((place) => place.id).join(",");
    addOrRemoveToFavList("place", "clear");
    router.push(`/list/${placeIds}`);
  }

  return (
    <div className='fav-list'>
      <h4>Favorites List</h4>
      {favList.map((place) => (
        <div className='fav-list-place' key={place.id}>
          {place.name}
          <span
            className='fav-list-place-remove'
            onClick={() => addOrRemoveToFavList(place)}
          >
            x
          </span>
        </div>
      ))}
      <button className='fav-list-save' onClick={() => saveList()}>
        Save List
      </button>
    </div>
  );
}
