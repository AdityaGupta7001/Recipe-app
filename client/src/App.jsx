import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import RecipeDetails from "./pages/RecipeDetails";

import AddRecipe from "./pages/AddRecipe";

import EditRecipe from "./pages/EditRecipe";

import Login from "./pages/Login";

import Register from "./pages/Register";

import MyRecipes from "./pages/MyRecipes";

import Navbar from "./components/Navbar";

import Favorites from "./pages/Favorites";


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/recipe/:id"
          element={<RecipeDetails />}
        />

        <Route
          path="/create"
          element={<AddRecipe />}
        />

        <Route
          path="/edit/:id"
          element={<EditRecipe />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/my-recipes"
          element={<MyRecipes />}
        />
        <Route
          path="/favorites"
          element={<Favorites />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;