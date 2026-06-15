import { useEffect, useState } from "react";
import { getRecipes, deleteRecipe } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";

function MyRecipes() {

  const [recipes, setRecipes] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {

    fetchMyRecipes();

  }, []);

  const fetchMyRecipes = async () => {

    try {

      const data = await getRecipes();
      console.log("ALL RECIPES:", data);

      const myRecipes = data.filter(
        (r) =>
          r.user?._id === userInfo._id ||
          r.user === userInfo._id
      );

      setRecipes(myRecipes);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this recipe?"
    );

    if (!confirmDelete) return;

    try {

      await deleteRecipe(id);

      fetchMyRecipes();

    } catch (error) {

      console.log(error);

    }

  };

  if (!userInfo) {

    return (

      <div className="p-8">

        <h2>You need to login first</h2>

      </div>

    );

  }

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        My Recipes
      </h1>

      {recipes.length === 0 ? (

        <p>No recipes created yet.</p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {recipes.map((recipe) => (

            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              showControls={true}
              handleDelete={handleDelete}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default MyRecipes;