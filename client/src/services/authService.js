import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";


// REGISTER
export const registerUser = async (userData) => {

  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;

};


// LOGIN
export const loginUser = async (userData) => {

  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;

};


// HELPER FUNCTION
const getConfig = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return {

    headers: {
      Authorization: `Bearer ${userInfo?.token}`
    }

  };

};


// ADD FAVORITE
export const addFavorite = async (recipeId) => {

  const response = await axios.post(
    `${API_URL}/favorites/${recipeId}`,
    {},
    getConfig()
  );

  return response.data;

};


// REMOVE FAVORITE
export const removeFavorite = async (recipeId) => {

  const response = await axios.delete(
    `${API_URL}/favorites/${recipeId}`,
    getConfig()
  );

  return response.data;

};


// GET FAVORITES
export const getFavorites = async () => {

  const response = await axios.get(
    `${API_URL}/favorites`,
    getConfig()
  );

  return response.data;

};