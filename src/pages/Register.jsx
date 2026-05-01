// import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Register() {
  //------------------state-----------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/users", {
        userName: data.userName,
        email: data.email,
        password: data.password,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  //-----------------Handlers-----------------

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 p-2">
        <div className="card-body mt-4 mb-4">
          <h1 className="text-2xl font-bold ">Create Account</h1>
          <p className="text-gray-500 mb-2">Start your journey today.</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4"
          >
            <InputField
              type="text"
              placeholder="Username"
              error={errors.userName?.message}
              {...register("userName", {
                required: "Username is required",
                minLength: { value: 3, message: "Min 3 chars" },
                maxLength: { value: 20, message: "Max 20 chars" },
              })}
            />
            <InputField
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email",
                },
              })}
            />
            <InputField
              type="password"
              placeholder="Password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Min 6 chars",
                },
              })}
            />
            <InputField
              type="password"
              placeholder="Confirm Password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <div className="mt-4">
              <button className="btn bg-red-950 text-white w-full rounded-xl">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
