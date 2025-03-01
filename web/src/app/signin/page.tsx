"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { setToken } from "@/utils/session";
import Image from "next/image";
import usePost from "@/hooks/usePost";
import { UserStore } from "@/store/UserStore";
import React, { useEffect } from "react";
import { URLS } from "@/constants";
import { FormSchema } from "@/validator/login.schema";
// import Loader from "@/components/Loader";
import Link from "next/link";
import * as leftIMage from "../../../public/singin.jpg";
export default function login() {
  const router = useRouter();
  type login = z.infer<typeof FormSchema>;
  const { postMutation, data, isSuccess, error, isPending } = usePost("");
  const { setIsLoggedIn, isLoggedIn, user, roles } = UserStore(
    (state) => state,
  );

  if (isLoggedIn) {
    if (roles.includes("SUPERADMIN")) {
      router.push("/superadmin");
    } else if (roles.includes("SCHOOLADMIN")) {
      router.push("/schooladmin");
    } else if (roles.includes("STUDENT")) {
      router.push("/student");
    } else if (roles.includes("ADMIN")) {
      router.push("/admin");
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setToken(data.data.accessToken);

      setIsLoggedIn(data.data);
    }
  }, [data]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    postMutation({ url: URLS.AUTH + "/login", data });
  }

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        {/* <Loader /> */}
        loading...
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="flex justify-between h-screen bg-white">
        {/* <!-- Left Section --> */}
        <div className="bg-green-300 w-1/2 flex items-center justify-center">
          <h1 className="text-4xl font-bold">
            <Image
              src={leftIMage}
              className="h-screen w-full"
              alt="left images"
            />
          </h1>
        </div>

        {/* <!-- Form Section --> */}
        <div className="w-1/2  flex items-center justify-center">
          <div className="w-full h-1/2 max-w-2xl p-6 ">
            <h1 className="text-4xl font-bold text-start">
              Welcome to the Event
            </h1>
            <h2 className="text-4xl font-bold text-start mb-6">
              Management App
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* <!-- Email --> */}
              <div>
                <label htmlFor="email" className="block text-2xl font-bold p-2">
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="asimneupane11@gmail.com"
                  className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              {/* <!-- Password --> */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-2xl font-bold p-2"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="helloworld@2"
                  className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {/* <!-- Forget Password --> */}
              <div className="text-right text-red-500 text-sm">
                <a href="#">Forgot Password?</a>
              </div>
              {/* <!-- Sign In Button --> */}
              <div>
                <button
                  type="submit"
                  className="w-full h-12 bg-green-400 text-white font-bold rounded-full hover:bg-green-500"
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className="my-6 flex items-center justify-between">
              <span className="w-10/12 border-t"></span>
              <span className="text-sm px-2 text-gray-500">Or</span>
              <span className="w-10/12 border-t"></span>
            </div>

            <div className="flex justify-around text-sm">
              <span>New to the App?</span>
              <Link href="#" className="text-blue-500 font-bold">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
