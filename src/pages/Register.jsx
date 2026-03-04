import React, { useState } from "react";
import { FaUser, FaHome, FaMailBulk, FaPhone, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { db } from "../libs/database";
import { TailSpin, ThreeDots } from "react-loader-spinner";

const Register = () => {
  const [role, setRole] = useState("tenant");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validate before setting loading
    if (!password || !email || !name || !phone || !cpass) {
      toast.error('Some fields are empty!')
      return
    }
    if (password !== cpass) {
      toast.error("Passwords don't match !")
      return
    }
    if (!email.includes('@')) {
      toast.error('Invalid email !')
      return
    }

    setLoading(true);
    try {
      const { data: authData, error } = await db.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role,
            phone,
          },
        },
      });
      if (error) {
        toast.error(error.message);
      } else {
        // create a corresponding profile row so fetchProfile can read it later
        const userId = authData.user?.id;
        if (userId) {
          const { error: profileError } = await db.from("profiles").insert({
            user_id: userId,
            full_name: name,
            role,
            phone,
          });
          if (profileError) {
            console.warn("failed to insert profile row", profileError);
          }
        }

        toast.success("Account succefully created !");
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
      setName("");
      setCpass("");
      setPassword("");
      setPhone("");
      setEmail("");
    }

  }

  return (
    <main className="flex flex-1 justify-center items-center p-3 pb-5 flex-col max-h-screen lg:h-screen overflow-y-hidden lg:py-3">
      <h1 className="flex-1 flex flex-col justify-between items-center mt-0 mb-3">
        <img
          src="../src/images/zilohomewb.png"
          alt="zilo home logo"
          className="w-70 h-60 rounded-full"
        />
        <p className="text-xl font-medium text-blue-800 text-center">
          Your journey starts here <br /> Take the first step
        </p>
      </h1>
      <div className="mb-10">
        <h2 className="text-center text-lg font-medium ">
          What's your status ?
        </h2>
        <div className="flex gap-4 justify-center items-center my-4">
          <div
            onClick={() => setRole("tenant")}
            className={`cursor-pointer flex flex-col items-center rounded-2xl p-3 justify-center transition ${role === "tenant" ? "bg-blue-800 text-gray-50 transform scale-100" : "bg-blue-400 text-gray-300"}`}
          >
            <FaUser className="w-8 h-5 rounded-2xl" />
            <code>Tenant</code>
          </div>
          <div
            onClick={() => setRole("landlord")}
            className={`cursor-pointer flex flex-col items-center rounded-2xl p-3 justify-center transition ${role === "landlord" ? "bg-blue-800 text-gray-50 transform scale-100" : "bg-blue-400 text-gray-300"}`}
          >
            <FaHome className="w-8 h-5 rounded-2xl" />
            <code>Landlord</code>
          </div>
          <div
            onClick={() => setRole("agent")}
            className={`cursor-pointer flex flex-col items-center rounded-2xl p-3 justify-center transition ${role === "agent" ? "bg-blue-800 text-gray-50 transform scale-100" : "bg-blue-400 text-gray-300"}`}
          >
            <FaHome className="w-8 h-5 rounded-2xl" />
            <code>Agent</code>
          </div>
        </div>
        {/* inputs */}
        <div className="space-y-4 my-2.5">
          <div className="flex p-2 px-5 gap-3 rounded-2xl bg-gray-400 justify-start items-center w-96">
            <FaUser className="text-gray-700" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              placeholder="Name"
              className="w-full p-1 outline-none bg-gray-400"
            />
          </div>
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
          <div className="flex p-2 px-5 gap-3 rounded-2xl bg-gray-400 justifystart items-center w-96">
            <FaPhone className="text-gray-700" />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              name="tel"
              id="tel"
              autoComplete="tel"
              placeholder="Phone"
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
          <div className="flex p-2 px-5 gap-3 rounded-2xl bg-gray-400 justify-start items-center w-96">
            <FaLock className="text-gray-700" />
            <input
              value={cpass}
              onChange={(e) => setCpass(e.target.value)}
              type="password"
              name="password"
              id="cpassword"
              autoComplete="password"
              placeholder="Confirm Password"
              className="w-full p-1 outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleRegister}
          disabled={loading}
          className="cursor-pointer rounded-2xl bg-violet-800 flex justify-center items-center text-white text-sm hover:bg-violet-900 hover:scale-105 hover:ease transition-all p-2 w-96 font-medium"
        >
          {loading ? <TailSpin height={25} color="white"/> :"sign up"}
        </button>
        <p className="text-md text-center mt-2">
          Already have an account ?{" "}
          <Link className="underline text-violet-500 font-medium" to={"/login"}>
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
