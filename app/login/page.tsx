"use client";
import React from "react";
import Image from "next/image";
import FormButton from "@/components/FormButton";
import TextField from "@/components/TextField";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 ">
      <div className="max-w-[1200px] mx-auto w-full bg-white rounded-[30px] min-h-fit  ">
        <div className="flex flex-col md:flex-row">
          <div className="w-1/2 bg-[url('../public/logincover.jpg')] rounded-l-[30px] min-h-fit bg-cover bg-center hidden md:block"></div>
          <div className="w-full md:w-1/2 flex items-center justify-center py-24 px-5 ">
            <form
              className="w-full max-w-[400px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Link href="/">
                <Image
                  src={Logo}
                  alt="logo"
                  width={150}
                  height={100}
                  className="mx-auto pb-1"
                />
              </Link>

              <div className="flex justify-center">
                <h3 className="text-center  text-lg pb-3 bg-white w-fit max-auto px-2">
                  Sign In
                </h3>
              </div>
              <hr className="border-1 border-gray-400 mt-[-26px]" />

              <TextField
                label="Email"
                type="email"
                slug="email"
                placeholder="Enter your email"
                error={errors.email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <TextField
                label="Password"
                type="password"
                slug="password"
                placeholder="Enter your password"
                error={errors.password}
                {...register("password", { required: "Password is required" })}
              />

              <FormButton text="Login" type="submit" />

              <div className="mt-4 text-center">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
