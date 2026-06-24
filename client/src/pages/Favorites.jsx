import { useEffect, useState } from "react";

import { getFavorites } from "../services/authService";

import RecipeCard from "../components/RecipeCard";


function Favorites() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    fetchFavorites();

  }, []);


  const fetchFavorites = async () => {

    try {

      const data = await getFavorites();

      setFavorites(data);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8 text-center">
        ❤️ My Favorite Recipes
      </h1>

      {favorites.length === 0 ? (

        <p className="text-center text-gray-500">
          No favorite recipes yet.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {favorites.map((recipe) => (

            <RecipeCard
              key={recipe._id}
              recipe={recipe}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default Favorites;