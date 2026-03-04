import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaMailBulk, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../libs/database";
import { UseAuth } from "../context/AuthContext";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { user , role , loading} = UseAuth();

  useEffect(() => {
    // only redirect after auth context finishes loading
    if(user){
      console.log("user detected in Login, redirecting to dashboard", user)
    }
    // require: user present, auth context not loading, role resolved, and local request not loading
    if (user && !loading && role && !isloading) {
      navigate("/dashboard", { replace: true });
      toast.success("Welcome back ! ");
    }
    console.log("Loading state :" , isloading , "Authstate : " , loading)
  }, [user, navigate, loading, role , isloading]);

  const handleSignin = async () => {
    setIsLoading(true);
    try {
      const { error } = await db.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login Successful");
      // navigation happens in useEffect when context updates
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <main className="h-screen flex justify-center items-center p-3 pb-5 flex-col max-h-screen lg:h-screen overflow-y-hidden lg:py-3">
        <h1 className=" flex flex-col justify-between items-center mt-0 mb-3">
          <img
            src="../src/images/zilohomewb.png"
            alt="zilo home logo"
            className="w-70 h-50 rounded-full flex-1"
          />
          <p className="text-xl font-medium text-blue-800 text-center">
            Hey , Welcome back good to see you .
          </p>
        </h1>
        <div className="mb-10 my-4">
          {/* inputs */}
          <div className="space-y-2 my-2.5">
            <div className="flex p-2 px-5 gap-3 rounded-2xl bg-gray-400 justify-start items-center w-96">
              <FaMailBulk className="text-gray-700" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Email"
                className="w-full p-1 outline-none"
              />
            </div>
            <div className="flex p-2 px-5 gap-3 rounded-2xl bg-gray-400 justify-start items-center w-96">
              <FaLock className="text-gray-700" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                autoComplete="password"
                placeholder="Password"
                className="w-full p-1 outline-none"
              />
            </div>
            <p className="text-md text-right mt-2">
              <Link className="underline text-violet-500 font-medium" to={"/"}>
                Forgot Password ?
              </Link>
            </p>
          </div>
          <button
            onClick={handleSignin}
            disabled={isloading}
            className={`cursor-pointer ${isloading ? 'opacity-50 cursor-not-allowed' : ''} rounded-2xl bg-violet-800 text-white text-sm hover:bg-violet-900 hover:scale-105 hover:ease transition-all p-2 w-96 font-medium flex justify-center items-center`}
          >
            {isloading ? <TailSpin height={25}/> : 'Sign In'}
          </button>
          <p className="text-md text-center mt-2">
            Don't have an account ?{" "}
            <Link
              className="underline text-violet-500 font-medium"
              to={"/register"}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
