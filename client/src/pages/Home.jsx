import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import RecipeCard from "../components/RecipeCard";

import "swiper/css";

import "swiper/css/pagination";

import {
  getRecipes,
  deleteRecipe
} from "../services/recipeService";


function Home() {

  const [recipes, setRecipes] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showVeg, setShowVeg] = useState(true);

  const [showNonVeg, setShowNonVeg] = useState(true);

  const navigate = useNavigate();


  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;


  useEffect(() => {

    fetchRecipes();

  }, []);


  const fetchRecipes = async () => {

    try {

      const data = await getRecipes();

      setRecipes(data);

    } catch (error) {

      console.log(error);

    }

  };


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteRecipe(id);

      fetchRecipes();

    } catch (error) {

      console.log(error);

    }

  };

   //FILTERED RECIPES
  const filteredRecipes = recipes.filter((recipe) => {

    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      recipe.category === categoryFilter;

      let matchesFoodType = true;

if (recipe.foodType === "Veg" && !showVeg) {
  matchesFoodType = false;
}

if (recipe.foodType === "Non-Veg" && !showNonVeg) {
  matchesFoodType = false;
}

    return matchesSearch && matchesCategory;

  });


  return (

    <div className="bg-gray-100 min-h-screen">


      {/* HERO SECTION */}

      <section className="bg-orange-50 px-8 py-20">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">


          {/* LEFT SIDE */}

          <div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">

              Cook With Love,
              <span className="text-orange-500">
                {" "}Share With Family
              </span>

            </h1>


            <p className="text-gray-600 text-lg mt-6 leading-relaxed">

              Discover comforting homemade recipes,
              family favorites, and delicious meals
              shared by food lovers from everywhere.

            </p>


            <div className="flex gap-4 mt-8">

              <button
                onClick={() => window.scrollTo({
                  top: 700,
                  behavior: "smooth"
                })}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600"
              >
                Explore Recipes
              </button>


              {userInfo && (

                <button
                  onClick={() => navigate("/create")}
                  className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-xl hover:bg-orange-100"
                >
                  Share Recipe
                </button>

              )}

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Food"
              className="rounded-3xl shadow-xl w-full max-w-lg object-cover"
            />

          </div>

        </div>

      </section>

      {/* FEATURED FOOD CAROUSEL */}

<section className="px-8 py-16 bg-white">

  <div className="max-w-6xl mx-auto">

    <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">

      Featured Comfort Foods

    </h2>


    <p className="text-center text-gray-600 mb-10 text-lg">

      Homemade meals loved by families everywhere.

    </p>


    <Swiper

      modules={[Autoplay, Pagination]}

      spaceBetween={30}

      slidesPerView={1}

      pagination={{ clickable: true }}

      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}

      loop={true}

      className="rounded-3xl overflow-hidden"

    >

      {/* SLIDE 1 */}

      <SwiperSlide>

        <div className="relative h-[450px]">

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Food"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex items-center">

            <div className="text-white px-10">

              <h3 className="text-5xl font-bold mb-4">
                Cozy Family Dinners
              </h3>

              <p className="text-xl max-w-xl">
                Warm homemade meals crafted
                with love and shared around
                the family table.
              </p>

            </div>

          </div>

        </div>

      </SwiperSlide>


      {/* SLIDE 2 */}

      <SwiperSlide>

        <div className="relative h-[450px]">

          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="Breakfast"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex items-center">

            <div className="text-white px-10">

              <h3 className="text-5xl font-bold mb-4">
                Fresh Morning Breakfasts
              </h3>

              <p className="text-xl max-w-xl">
                Start your mornings with
                nourishing homemade recipes.
              </p>

            </div>

          </div>

        </div>

      </SwiperSlide>


      {/* SLIDE 3 */}

      <SwiperSlide>

        <div className="relative h-[450px]">

          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
            alt="Dessert"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex items-center">

            <div className="text-white px-10">

              <h3 className="text-5xl font-bold mb-4">
                Sweet Homemade Desserts
              </h3>

              <p className="text-xl max-w-xl">
                Comforting desserts made to
                bring joy to every occasion.
              </p>

            </div>

          </div>

        </div>

      </SwiperSlide>

    </Swiper>

  </div>

</section>
<h1 className="text-4xl font-bold text-center text-gray-800 mt-16 mb-8">

  Explore All Recipes

</h1>
      {/* RECIPES SECTION */}
      <div className="p-8">

 <div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold">
    All Recipes
  </h1>

  <div className="flex gap-4">

    <button
      onClick={() => setShowVeg(!showVeg)}
      className={`
        p-2 rounded-xl shadow-md
        hover:shadow-lg hover:-translate-y-1
        transition-all duration-200
        ${
          showVeg
            ? "bg-green-50"
            : "opacity-40"
        }
      `}
    >
      <div className="w-6 h-6 border-2 border-green-600 rounded-sm flex items-center justify-center">
        <div className="w-3 h-3 bg-green-600 rounded-full" />
      </div>
    </button>

    <button
      onClick={() => setShowNonVeg(!showNonVeg)}
      className={`
        p-2 rounded-xl shadow-md
        hover:shadow-lg hover:-translate-y-1
        transition-all duration-200
        ${
          showNonVeg
            ? "bg-red-50"
            : "opacity-40"
        }
      `}
    >
      <div className="w-6 h-6 border-2 border-red-600 rounded-sm flex items-center justify-center">
        <div className="w-3 h-3 bg-red-600 rounded-full" />
      </div>
    </button>

  </div>

</div>


        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-3 rounded-lg flex-1"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-3 rounded-lg"
          >

            <option value="All">
              All Categories
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

        </div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {filteredRecipes.map((recipe) => (

    <RecipeCard
      key={recipe._id}
      recipe={recipe}
    />

  ))}

</div>

      </div>

      {/* FOOTER */}

<footer className="bg-[#fff7f2] border-t mt-20 rounded-t-[40px] shadow-inner">


  {/* TOP BAR */}

  <div className="flex justify-center pt-8">

  <button
    onClick={() => window.scrollTo({
      top: 0,
      behavior: "smooth"
    })}
    className="
      bg-white
      px-6
      py-3
      rounded-full
      shadow-md
      text-gray-700
      font-medium
      hover:-translate-y-1
      hover:shadow-lg
      hover:text-orange-500
      transition
      duration-300
    "
  >
    ↑ Back To Top
  </button>

</div>



  {/* MAIN FOOTER */}

  <div className="max-w-6xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">


    {/* ABOUT */}

    <div>

      <h3 className="text-2xl font-bold text-orange-500 mb-5">

        Aroma

      </h3>

      <p className="text-gray-600 leading-relaxed">

        Bringing home cooks together through
        comforting homemade recipes and
        shared cooking experiences.

      </p>

    </div>



    {/* ACCOUNT */}

    <div>

      <h4 className="text-lg font-semibold text-gray-800 mb-5">

        Account

      </h4>

      <div className="flex flex-col gap-3 text-gray-600">

        <button
          onClick={() => navigate("/login")}
          className="text-left hover:text-orange-500 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="text-left hover:text-orange-500 transition"
        >
          Register
        </button>

        <button
          className="text-left hover:text-orange-500 transition"
        >
          Your Profile
        </button>

      </div>

    </div>



    {/* SUPPORT */}

    <div>

      <h4 className="text-lg font-semibold text-gray-800 mb-5">

        Support

      </h4>

      <div className="flex flex-col gap-3 text-gray-600">

        <button
          className="text-left hover:text-orange-500 transition"
        >
          Contact Us
        </button>

        <button
          className="text-left hover:text-orange-500 transition"
        >
          Report A Problem
        </button>

        <button
          className="text-left hover:text-orange-500 transition"
        >
          Help Center
        </button>

      </div>

    </div>



    {/* CONNECT */}

    <div>

      <h4 className="text-lg font-semibold text-gray-800 mb-5">

        Connect

      </h4>

      <div className="flex flex-col gap-3 text-gray-600">

        <button
          className="text-left hover:text-orange-500 transition"
        >
          Instagram
        </button>

        <button
          className="text-left hover:text-orange-500 transition"
        >
          Facebook
        </button>

        <button
          className="text-left hover:text-orange-500 transition"
        >
          Twitter
        </button>

        <button
          className="text-left hover:text-orange-500 transition"
        >
          Email
        </button>

      </div>

    </div>

  </div>



  {/* COPYRIGHT */}

  <div className="border-t py-5 text-center text-gray-500 text-sm">

    © 2026 Aroma · All Rights Reserved.

  </div>

</footer>

    </div>

  );

}

export default Home;