"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import TextField from "@/components/TextField";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

interface IFormInput {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const password = watch("password");
  const email = watch("email");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  useEffect(() => {
    // Reset email error whenever the email field changes
    setEmailError("");
  }, [email]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    const { ...formData } = data; // Exclude confirmPassword
    const { email, password } = formData; // Extract email and password for login

    try {
      // Register the user
      const response = await axios.post("/api/register", formData);
      console.log(response.data);
      console.log("User registered successfully");

      // Login after registration
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("Login Response:", result); // Debugging

      if (result?.error) {
        console.log("Login error:", result.error);
      } else {
        router.push("/dashboard"); // Redirect on success
      }
      setLoading(false);
    } catch (error: any) {
      console.error(error);

      // Handle email already exists error
      if (error.response?.status === 400) {
        setEmailError("Email already exists");
      }

      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 ">
      <div className="max-w-[1200px] mx-auto w-full bg-white rounded-[30px] min-h-fit  ">
        <div className="flex flex-col md:flex-row">
          <div className="w-1/2 bg-[url('/registercover.jpg')] rounded-l-[30px] min-h-fit bg-cover bg-center hidden md:block"></div>
          <div className="w-full md:w-1/2 flex items-center justify-center py-10 px-5">
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
                  Create Account
                </h3>
              </div>
              <hr className="border-1 border-gray-400 mt-[-26px]" />

              <TextField
                label="Name"
                type="text"
                slug="name"
                placeholder="Enter your name"
                error={errors.name}
                {...register("name", { required: "Name is required" })}
              />
              <TextField
                label="Email"
                type="email"
                slug="email"
                placeholder="Enter your email"
                error={errors.email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <TextField
                label="Confirm Password"
                type="password"
                slug="confirm-password"
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              {emailError && (
                <p className="text-red-500 text-[13px]">{emailError}</p>
              )}

              <Button text={loading ? "Loading..." : "Create Account"} type="submit" />

              <div className="mt-4 text-center">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Sign In
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

export default Register;
