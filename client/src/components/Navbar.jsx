import { Link, useNavigate } from "react-router-dom";


function Navbar() {

  const navigate = useNavigate();


  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );


  const logoutHandler = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("userInfo");

    navigate("/login");

  };


  return (

    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="text-2xl font-bold text-orange-500"
      >
        Aroma
      </Link>


      <div className="flex gap-4 items-center">

        <Link
          to="/"
          className="hover:text-orange-500"
        >
          Home
        </Link>


        {userInfo ? (

          <>

            <Link
              to="/create"
              className="hover:text-orange-500"
            >
              Add Recipe
            </Link>

            <Link
              to="/my-recipes"
              className="hover:text-orange-500"
            >
              My Recipes
            </Link>

            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>

          </>

        ) : (

          <>

            <Link
              to="/login"
              className="hover:text-orange-500"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-orange-500"
            >
              Register
            </Link>

          </>

        )}

      </div>

    </nav>

  );

}


export default Navbar;