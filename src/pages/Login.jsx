import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaMailBulk, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../libs/database";
import { UseAuth } from "../context/AuthContext";
import { TailSpin } from "react-loader-spinner";
import logo from "../images/zilohomewb.png"

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
    <main className="min-h-screen flex items-center justify-center p-3 lg:py-12 lg:px-8 lg:bg-gradient-to-r lg:from-violet-50/10 lg:to-transparent lg:rounded-3xl lg:shadow-xl lg:border lg:border-white/10">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-stretch gap-6">
        <aside className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6">
          <img
            src={logo}
            alt="zilo home logo"
            className="w-48 h-48 rounded-full mb-6"
          />
          <p className="text-xl font-medium text-blue-800 text-center lg:text-left">
            Hey, welcome back good to see you.
          </p>
        </aside>

        <section className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md bg-white/60 lg:bg-white/10 backdrop-blur-md lg:backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="space-y-2 my-2.5">
              <div className="flex p-2 px-5 gap-3 rounded-2xl bg-gray-400 justify-start items-center">
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
              <div className="flex p-2 px-5 gap-3 rounded-2xl bg-gray-400 justify-start items-center">
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
                <Link className="underline text-blue-900 font-medium" to={'/'}>
                  Forgot Password ?
                </Link>
              </p>
            </div>
            <button
              onClick={handleSignin}
              disabled={isloading}
              className={`cursor-pointer ${isloading ? 'opacity-50 cursor-not-allowed' : ''} rounded-2xl bg-blue-800 text-white text-sm hover:bg-blue-900 hover:scale-105 hover:ease transition-all p-2 w-full font-medium flex justify-center items-center`}
            >
              {isloading ? <TailSpin height={25}/> : 'Sign In'}
            </button>
            <p className="text-md text-center mt-2">
              Don't have an account ?{' '}
              <Link
                className="underline text-blue-800 font-medium"
                to={'/register'}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
