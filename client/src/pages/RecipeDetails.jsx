import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import axios from "axios";


function RecipeDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);


  useEffect(() => {

    fetchRecipe();

  }, []);


  const fetchRecipe = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/recipes/${id}`
      );

      setRecipe(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  if (!recipe) {

    return (
      <h2 className="p-8 text-2xl">
        Loading...
      </h2>
    );

  }


  return (

    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">

        <button
          onClick={() => navigate(-1)}
          className="fixed top-24 left-6 z-50 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition"
         >
         <FaArrowLeft />
         </button>

{/* TITLE + VEG/NON-VEG */}

<div className="flex justify-between items-start mb-4">

  <h1 className="text-4xl font-bold">
    {recipe.title}
  </h1>

  {recipe.foodType && (

    <div
      className={`
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


{/* INFO PILLS */}

<div className="flex flex-wrap gap-3 mb-6">

  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
    {recipe.category}
  </span>

  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
    {recipe.difficulty}
  </span>

  <span
    className={`px-3 py-1 rounded-full ${
      recipe.cookingTime <= 15
        ? "bg-green-100 text-green-700"
        : recipe.cookingTime <= 45
        ? "bg-yellow-100 text-yellow-700"
        : "bg-orange-100 text-orange-700"
    }`}
  >
    {recipe.cookingTime <= 15
      ? "Quick"
      : recipe.cookingTime <= 45
      ? "Regular"
      : "Slow"}
  </span>

</div>


        <h2 className="text-2xl font-semibold mb-3">
          Ingredients
        </h2>

        <ul className="list-disc list-inside mb-6 space-y-2">

          {recipe.ingredients.map((ingredient, index) => (

            <li key={index}>
              {ingredient}
            </li>

          ))}

        </ul>


        <h2 className="text-2xl font-semibold mb-3">
          Steps
        </h2>

        <ol className="list-decimal list-inside space-y-3">

          {recipe.steps.map((step, index) => (

            <li key={index}>
              {step}
            </li>

          ))}

        </ol>

      </div>

    </div>

  );

}

export default RecipeDetails;