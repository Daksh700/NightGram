import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  // Place your login handling logic here
  const login = async (data) => {
    // handle login
    setError("");
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1117] px-2">
      <div className="w-full max-w-lg bg-[#161b22] rounded-xl p-6 sm:p-8 md:p-10 border border-[#30363d] mx-4 sm:mx-auto">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-20 sm:w-28 md:w-36 max-w-full">
            <Logo width="w-full" />
          </span>
        </div>
        <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight text-[#e6edf3]">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-[#7d8590]">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-500 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 text-base sm:text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
