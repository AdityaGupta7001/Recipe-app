import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getRecipes } from "../services/recipeService";

import { getFavorites } from "../services/authService";


function Profile() {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [recipeCount, setRecipeCount] = useState(0);

  const [favoriteCount, setFavoriteCount] = useState(0);


  useEffect(() => {

    fetchData();

  }, []);


  const fetchData = async () => {

    try {

      // Fetch all recipes
      const recipes = await getRecipes();

      // Count only user's recipes
      const myRecipes = recipes.filter(
        (recipe) =>
          recipe.user === userInfo.user.id
      );

      setRecipeCount(myRecipes.length);

      // Fetch favorites
      const favorites = await getFavorites();

      setFavoriteCount(favorites.length);

    } catch (error) {

      console.log(error);

    }

  };


  const handleLogout = () => {

    localStorage.removeItem("userInfo");

    navigate("/login");

  };


  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Profile Header */}

        <div className="flex flex-col items-center mb-8">

          <div className="
            w-28 h-28 rounded-full
            bg-orange-200
            flex items-center justify-center
            text-4xl font-bold text-orange-700
            mb-4
          ">

            {userInfo.user.name.charAt(0)}

          </div>

          <h1 className="text-3xl font-bold">

            {userInfo.user.name}

          </h1>

          <p className="text-gray-500">

            {userInfo.user.email}

          </p>

        </div>


        {/* Stats */}

        <div className="grid grid-cols-2 gap-4 mb-8">

          <div className="
            bg-orange-100
            rounded-xl
            p-6
            text-center
          ">

            <h2 className="text-4xl font-bold">

              {recipeCount}

            </h2>

            <p className="text-gray-600">

              Recipes Added

            </p>

          </div>


          <div className="
            bg-red-100
            rounded-xl
            p-6
            text-center
          ">

            <h2 className="text-4xl font-bold">

              {favoriteCount}

            </h2>

            <p className="text-gray-600">

              Favorites

            </p>

          </div>

        </div>


        {/* Buttons */}

        <div className="space-y-4">

          <button
            onClick={() => navigate("/myrecipes")}
            className="
              w-full bg-orange-500 text-white
              py-3 rounded-xl
              hover:bg-orange-600
            "
          >
            My Recipes
          </button>

          <button
            onClick={() => navigate("/favorites")}
            className="
              w-full bg-pink-500 text-white
              py-3 rounded-xl
              hover:bg-pink-600
            "
          >
            Favorites
          </button>

          <button
            onClick={handleLogout}
            className="
              w-full bg-red-500 text-white
              py-3 rounded-xl
              hover:bg-red-600
            "
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Profile;