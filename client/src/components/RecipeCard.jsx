import { useNavigate } from "react-router-dom";

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
  handleDelete
}) {

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

    Easy: "bg-green-500",

    Medium: "bg-yellow-500",

    Hard: "bg-red-500"

  };


  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

      {/* IMAGE */}

      {recipe.image && (

        <img
          src={`http://localhost:5000${recipe.image}`}
          alt={recipe.title}
          className="w-full h-52 object-cover"
        />

      )}


      <div className="p-5">

        {/* TITLE + DIFFICULTY */}

        <div className="flex justify-between items-start mb-3">

          <h3
            onClick={() =>
              navigate(`/recipe/${recipe._id}`)
            }
            className="text-xl font-bold cursor-pointer hover:text-orange-500"
          >
            {recipe.title}
          </h3>

          <span
            className={`
              text-white text-xs px-3 py-1 rounded-full
              ${difficultyStyle[recipe.difficulty]}
            `}
          >
            {recipe.difficulty}
          </span>

        </div>


        {/* CATEGORY */}

        <div className="flex items-center gap-2 text-gray-600 mb-4">

          {categoryIcons[recipe.category]}

          <span>
            {recipe.category}
          </span>

        </div>


        {/* TIMER */}

        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-2">

            <FaClock className="text-orange-500" />

            <div>

              <p className="text-2xl font-bold">
                {recipe.cookingTime}
              </p>

              <p className="text-sm text-gray-500">
                mins
              </p>

            </div>

          </div>


          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${timeStyle}`}
          >
            {timeLabel}
          </span>

        </div>


        {/* VEG/NON-VEG */}

        {recipe.foodType && (

          <div className="mb-4">

            <div
              className={`
                w-6 h-6
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

          </div>

        )}


        {/* BUTTONS */}

        {showControls && (

          <div className="flex gap-3 mt-4">

            <button
              onClick={() =>
                navigate(`/edit/${recipe._id}`)
              }
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(recipe._id)
              }
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