import { useNavigate } from "react-router-dom";

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

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex justify-between items-start mb-2">

        <h3
          onClick={() =>
            navigate(`/recipe/${recipe._id}`)
          }
          className="text-xl font-semibold cursor-pointer hover:text-orange-500"
        >
          {recipe.title}
        </h3>

        {recipe.foodType && (

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

        )}

      </div>

      <p className="text-gray-600">
        {recipe.category}
      </p>

      <div className="flex gap-2 mt-3">

        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${timeStyle}`}
        >
          {timeLabel}
        </span>

      </div>

      {showControls && (

        <div className="flex gap-3 mt-4">

          <button
            onClick={() =>
              navigate(`/edit/${recipe._id}`)
            }
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() =>
              handleDelete(recipe._id)
            }
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </div>

      )}

    </div>

  );

}

export default RecipeCard;