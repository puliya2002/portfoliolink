"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import TextField from "@/components/TextField";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const [error, setError] = useState("");
  const password = watch("password");
  const email = watch("email");
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  useEffect(() => {
    setError("");
  }, [email, password]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setError(""); // Reset error message
    const { email, password } = data;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("Login Response:", result); // Debugging

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard"); // Redirect on success
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 ">
      <div className="max-w-[1200px] mx-auto w-full bg-white rounded-[30px] min-h-fit">
        <div className="flex flex-col md:flex-row">
          <div className="w-1/2 bg-[url('../public/logincover.jpg')] rounded-l-[30px] min-h-fit bg-cover bg-center hidden md:block"></div>
          <div className="w-full md:w-1/2 flex items-center justify-center py-24 px-5">
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
                <h3 className="text-center text-lg pb-3 bg-white w-fit max-auto px-2">
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
              {error && <p className="text-red-500 text-[13px]">{error}</p>}
              <Button text="Login" type="submit" />

              <div className="mt-4 text-center">
                <p className="text-sm">
                  Don't have an account?
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
