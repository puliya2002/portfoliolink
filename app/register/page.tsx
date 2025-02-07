import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Link from "next/link";
import Logo from "@/public/logo.png";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 ">
      <div className="max-w-[1200px] mx-auto w-full bg-white rounded-[30px] min-h-fit  ">
        <div className="flex flex-col md:flex-row">
          <div className="w-1/2 bg-[url('../public/registercover.jpg')] rounded-l-[30px] min-h-fit bg-cover bg-center hidden md:block"></div>
          <div className="w-full md:w-1/2 flex items-center justify-center py-10 px-5">
            <form className="w-full max-w-[400px] ">
              <Link href="/">
                <Image src={Logo} alt="logo" width={150} height={100} className="mx-auto pb-1"></Image>
              </Link>

              <div className="flex justify-center">
                <h3 className="text-center  text-xl pb-3 bg-white w-fit max-auto px-2">
                  Create Account
                </h3>
              </div>
              <hr className="border-1 border-gray-400 mt-[-26px]"/>

              <TextField
                label="Name"
                type="text"
                slug="name"
                placeholder="Enter your name"
              />
              <TextField
                label="Email"
                type="email"
                slug="email"
                placeholder="Enter your email"
              />

              <TextField
                label="Username"
                type="text"
                slug="username"
                placeholder="Enter your username"
              />
              <TextField
                label="Password"
                type="password"
                slug="password"
                placeholder="Enter your password"
              />

              <TextField
                label="Confirm Password"
                type="password"
                slug="confirm-password"
                placeholder="Enter your password"
              />

              <Button text="Create Account" type="submit" />

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
