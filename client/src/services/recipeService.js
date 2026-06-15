import axios from "axios";

const API_URL = "http://localhost:5000/api/recipes";


// Helper function
const getConfig = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const token = userInfo?.token;

  return {

    headers: {
      Authorization: `Bearer ${token}`
    }

  };

};


// GET all recipes
export const getRecipes = async () => {

  const response = await axios.get(API_URL);

  return response.data;

};


// CREATE recipe
export const createRecipe = async (recipeData) => {

  const response = await axios.post(

    API_URL,

    recipeData,

    getConfig()

  );

  return response.data;

};


// DELETE recipe
export const deleteRecipe = async (id) => {

  const response = await axios.delete(

    `${API_URL}/${id}`,

    getConfig()

  );

  return response.data;

};


// UPDATE recipe
export const updateRecipe = async (
  id,
  recipeData
) => {

  const response = await axios.put(

    `${API_URL}/${id}`,

    recipeData,

    getConfig()

  );

  return response.data;

};