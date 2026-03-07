import React, { useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { RevolvingDot } from "react-loader-spinner";
import landingImg from "../images/house10.jpg"
import logo from "../images/zilohomewb.png"

const LandingPage = () => {
  const navigate = useNavigate();
  const { loading, user, role } = UseAuth();

  useEffect(() => {
    setTimeout(() => {
      if (!loading && user && role) {
        navigate("/dashboard", { replace: true });
    }
    }, 5000);
  }, [loading, user, role, navigate]);

  if (!loading&&user) return <div className="h-screen p-3 text-center w-full flex items-center justify-center font-extralight flex-col space-y-10 text-2xl ">Hey , <span className="text-violet-700 font-extralight capitalize ">{user ? user.user_metadata?.full_name : ''}</span> Hope you're doing great today! <br/> Let's redirect you to your account! <div className="my-10 "><RevolvingDot color="blue"/></div> </div>
  return (
    <div
      className="relative p-3 m-0 flex items-center min-h-screen w-full overflow-auto"
      style={{ backgroundImage: `url(${landingImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch h-full gap-6 lg:gap-12 py-8">
        <aside className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start p-6 lg:p-8 text-white text-center lg:text-left">
          <img src={logo} alt="zilo logo" className="w-32 h-32 md:w-40 md:h-40 mb-4 lg:mb-6 mx-auto lg:mx-0" />
          <h1 className="font-extralight text-3xl sm:text-4xl lg:text-6xl">Search</h1>
          <h1 className="font-extralight text-3xl sm:text-4xl lg:text-6xl">Discover</h1>
          <h1 className="font-extralight text-3xl sm:text-4xl lg:text-6xl">Move In</h1>
          <h2 className="text-sm sm:text-base lg:text-2xl text-gray-200 my-4 lg:my-6 max-w-lg mx-auto lg:mx-0">
            Search , Discover , and Rent your next home with ease. Browse verified properties from landlords and agents near you.
          </h2>
        </aside>

        <section className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-md mx-auto">
            <p className="text-gray-800 text-base sm:text-lg mb-4 text-center">Welcome to Zilo Home <br /> Find your next place.</p>
            <button
              className="rounded-2xl bg-violet-500 cursor-pointer p-3 text-white text-lg w-full"
              onClick={() => navigate('/register')}
            >
              Let's get started
            </button>
          </div>
          <p className="text-white text-lg text-left mt-4 ">Member of Zilo Home ? <Link to= "/login"  className="text-blue-500 underline font-medium">Sign In</Link></p>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
