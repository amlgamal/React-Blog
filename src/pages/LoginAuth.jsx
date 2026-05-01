// import React, { useState } from "react";

import InputField from "../components/InputField";
import { toast } from "sonner";
import {  useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function LoginAuth() {
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      const users = res.data;

      const user = users.find((u) => u.email === data.email);
      if (!user) {
        toast.error("Email not found ❌");
        return;
      }

      // 4. check password
      if (user.password !== data.password) {
        toast.error("Wrong password ❌");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      // 5. success
      toast.success("Login successful 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-gray-500">Welcome back 👋</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4"
          >
            {/* Email */}
            <InputField
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />

            {/* Password */}
            <InputField
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />

            {/* Button */}
            <button className="btn bg-red-950 text-white w-full">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
