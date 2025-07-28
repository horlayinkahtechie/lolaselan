import { FiHeart } from "react-icons/fi";

export default function AddToFavorite() {
  return (
    <>
      <button className="absolute top-2 cursor-pointer right-2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100">
        <FiHeart className="text-gray-600 hover:text-red-500" />
      </button>
    </>
  );
}
