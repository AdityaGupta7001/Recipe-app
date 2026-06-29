import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";


function EditRecipe() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    cookingTime: "",
    category: "",
    difficulty: "Easy",
    image: ""
  });


  useEffect(() => {

    fetchRecipe();

  }, []);


  const fetchRecipe = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/recipes/${id}`
      );

      const recipe = response.data;


      setFormData({
        title: recipe.title,
        ingredients: recipe.ingredients.join(", "),
        steps: recipe.steps.join(", "),
        cookingTime: recipe.cookingTime,
        category: recipe.category,
        difficulty: recipe.difficulty,
        image: recipe.image || ""
      });

    } catch (error) {

      console.log(error);

    }

  };


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
      );

      const token = userInfo?.token;


      const updatedRecipe = {

        ...formData,

        ingredients: formData.ingredients
          .split(",")
          .map((item) => item.trim()),

        steps: formData.steps
          .split(",")
          .map((item) => item.trim()),

        cookingTime: Number(formData.cookingTime)

      };


      await axios.put(

        `http://localhost:5000/api/recipes/${id}`,

        updatedRecipe,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );


      alert("Recipe Updated Successfully");

      navigate("/");

    } catch (error) {

      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.status);

      alert("Failed to update recipe");

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">

        <h2 className="text-3xl font-bold mb-6">
          Edit Recipe
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
          placeholder="Enter steps separated by commas"
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
            placeholder="Cooking Time"
            value={formData.cookingTime}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

           <input
            type="text"
            name="image"
            placeholder="Paste image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
           />

            {formData.image && (
            <img
            src={formData.image}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
            />
           )}


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
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
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
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Update Recipe
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditRecipe;