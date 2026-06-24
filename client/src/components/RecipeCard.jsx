import { useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa";

import {
  addFavorite,
  removeFavorite
} from "../services/authService";

import {
  FaClock,
  FaUtensils,
  FaCookieBite,
  FaGlassWhiskey
} from "react-icons/fa";

import {
  GiFriedEggs,
  GiMeal
} from "react-icons/gi";


function RecipeCard({
  recipe,
  showControls = false,
  handleDelete,
  isFavoritePage = false,
  onFavoriteRemoved
})

{

  const navigate = useNavigate();


  let timeLabel = "";
  let timeStyle = "";

  if (recipe.cookingTime <= 15) {

    timeLabel = "Quick";
    timeStyle = "bg-green-100 text-green-700";

  }
  else if (recipe.cookingTime <= 45) {

    timeLabel = "Regular";
    timeStyle = "bg-yellow-100 text-yellow-700";

  }
  else {

    timeLabel = "Slow";
    timeStyle = "bg-orange-100 text-orange-700";

  }


  const categoryIcons = {

    Breakfast: <GiFriedEggs size={18} />,

    Lunch: <GiMeal size={18} />,

    Dinner: <FaUtensils size={18} />,

    Snack: <FaCookieBite size={18} />,

    Dessert: <FaCookieBite size={18} />,

    Drink: <FaGlassWhiskey size={18} />

  };


  const difficultyStyle = {

  Easy: "bg-green-100 text-green-700",

  Medium: "bg-yellow-100 text-yellow-700",

  Hard: "bg-red-100 text-red-700"

};
  {/*FAVORITE HANDLER */}
const handleFavorite = async (e) => {

  e.stopPropagation();

  try {

    if (isFavoritePage) {

      await removeFavorite(recipe._id);

      if (onFavoriteRemoved) {

        onFavoriteRemoved(recipe._id);

      }

      alert("Removed from favorites");

    }

    else {

      await addFavorite(recipe._id);

      alert("Recipe added to favorites ❤️");

    }

  }

  catch (error) {

    console.log(error);

  }

};

  return (

    <div
    onClick={() => navigate(`/recipe/${recipe._id}`)}
    className="
      bg-white rounded-2xl overflow-hidden shadow-md
      cursor-pointer
      hover:-translate-y-2
      hover:shadow-2xl
      transition-all duration-300
    "
  >

      {/* IMAGE */}

      {recipe.image && (

  <div className="relative">

    <img
      src={`http://localhost:5000${recipe.image}`}
      alt={recipe.title}
      className="w-full h-52 object-cover"
    />

    <button
      onClick={handleFavorite}
      className="
        absolute top-3 right-3
        bg-white p-2 rounded-full
        shadow-md
        hover:scale-110
        transition
      "
    >

      <FaHeart
  className={
    isFavoritePage
      ? "text-red-500"
      : "text-gray-400"
  }
/>

    </button>

  </div>

)}

      <div className="p-5">

        {/* TITLE + DIFFICULTY */}
<div className="flex justify-center relative mb-6">

  <h3 className="text-2xl font-bold text-center">
    {recipe.title}
  </h3>

  {recipe.foodType && (

    <div
      className={`
        absolute right-0 top-0
        w-7 h-7
        border-2
        flex items-center justify-center
        rounded-sm
        ${
          recipe.foodType === "Veg"
            ? "border-green-600"
            : "border-red-600"
        }
      `}
    >
      <div
        className={`
          w-3 h-3 rounded-full
          ${
            recipe.foodType === "Veg"
              ? "bg-green-600"
              : "bg-red-600"
          }
        `}
      />
    </div>

  )}

</div>





        {/* TIMER */}

<div className="flex flex-col items-center mb-6">

  <FaClock className="text-orange-500 mb-2 text-2xl" />

  <p className="text-5xl font-bold">
    {recipe.cookingTime}
  </p>

  <p className="text-gray-500 mb-3">
    mins
  </p>

  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${timeStyle}`}
  >
    {timeLabel}
  </span>

</div>


        {/* BUTTONS */}


        <div className="flex justify-between items-center mt-6">

  <span
    className={`
      px-3 py-1 rounded-full text-sm font-semibold
      ${difficultyStyle[recipe.difficulty]}
    `}
  >
    {recipe.difficulty}
  </span>

  <div className="flex items-center gap-2 text-gray-600">

    {categoryIcons[recipe.category]}

    <span>
      {recipe.category}
    </span>

  </div>

</div>

        {showControls && (

          <div className="flex gap-3 mt-4">

            <button
              onClick={(e) => {
                 e.stopPropagation();
                navigate(`/edit/${recipe._id}`);
               }}
                 className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
             >
                Edit
              </button>

             <button
              onClick={(e) => {
               e.stopPropagation();
              handleDelete(recipe._id);
              }}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>

          </div>

        )}

      </div>

    </div>

  );

}

export default RecipeCard;