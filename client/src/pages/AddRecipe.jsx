import { useState } from "react";

import { createRecipe } from "../services/recipeService";

import { useNavigate } from "react-router-dom";


function AddRecipe() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    cookingTime: "",
    category: "",
    foodType: "Veg",
    difficulty: "Easy"
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const recipeData = {

        ...formData,

        ingredients: formData.ingredients
          .split(",")
          .map((item) => item.trim()),

        steps: formData.steps
          .split(",")
          .map((item) => item.trim()),

        cookingTime: Number(formData.cookingTime)

      };


      await createRecipe(recipeData);

      alert("Recipe Added Successfully");

      navigate("/myrecipes");


      setFormData({
        title: "",
        ingredients: "",
        steps: "",
        cookingTime: "",
        category: "",
        foodType: "Veg",
        difficulty: "Easy"
      });

    } catch (error) {

      console.log(error.response?.data || error.message);

      alert("Failed to add recipe");

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">

        <h2 className="text-3xl font-bold mb-6">
          Add Recipe
        </h2>


        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />


          <label className="font-medium">
             Ingredients
          </label>

          <textarea
           name="ingredients"
           placeholder="Enter ingredients separated by commas"
           value={formData.ingredients}
           onChange={handleChange}
           rows={6}
           className="w-full border p-3 rounded-lg resize-none"
           required
          />


          <label className="font-medium">
           Cooking Steps
          </label>

          <textarea
            name="steps"
            placeholder="One step per line, separated by commas"
            value={formData.steps}
            onChange={handleChange}
            rows={8}
            className="w-full border p-3 rounded-lg resize-none"
            required
           />


          <input
            type="text"
            inputMode="numeric"
            name="cookingTime"
            placeholder="Cooking Time in Minutes"
            value={formData.cookingTime}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />


          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Category
            </option>

            <option value="Breakfast">
              Breakfast
            </option>

            <option value="Lunch">
              Lunch
            </option>

            <option value="Dinner">
              Dinner
            </option>

            <option value="Snack">
              Snack
            </option>

            <option value="Dessert">
              Dessert
            </option>

            <option value="Drink">
              Drink
            </option>

          </select>

          <select
           name="foodType"
           value={formData.foodType}
           onChange={handleChange}
           className="w-full border p-3 rounded-lg"
           >
           <option value="Veg">Veg</option>
           <option value="Non-Veg">Non-Veg</option>
           </select>


          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >

            <option value="Easy">
              Easy
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Hard">
              Hard
            </option>

          </select>


          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
          >
            Add Recipe
          </button>

        </form>

      </div>

    </div>

  );

}

export default AddRecipe;