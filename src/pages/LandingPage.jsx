import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { RevolvingDot } from "react-loader-spinner";

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
    <div className="relative p-3 m-0 flex flex-col justify-between h-screen w-full bg-[url(../src/images/house10.jpg)]">
      <div className="flex flex-col space-y-2 mt-7 w-full justify-around items-start">
        <div>
          <img src="../src/images/zilohomewb.png" alt="" className="w-40 h-35"/>
        </div>
        <h1 className="font-extralight text-6xl text-white">Explore</h1>
        <h1 className="font-extralight text-6xl text-white">Travel</h1>
        <h1 className="font-extralight text-6xl text-white">Inspire</h1>
        <h2 className="text-2xl text-gray-300 my-6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint sed
        illum, fuga pariatur expedita porro
      </h2>
      </div>
      

      <div className="relative gap-3 -bottom-3 w-full flex justify-between items-center text-center my-4 flex-col">
        <button className="rounded-2xl bg-violet-500 cursor-pointer p-2 text-white text-xl w-96" onClick={() => navigate('/login')}>Login</button>
        <button className="rounded-2xl bg-violet-500 cursor-pointer p-2 text-white text-xl w-96" onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default LandingPage;
