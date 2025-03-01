"use client";
import { FormSchema } from "@/validator/createUser.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import usePost from "@/hooks/usePost";
import { URLS } from "@/constants";
import { useState } from "react";

export default function CreateUser() {
  type User = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
  });

  const { postMutation, error, isError, isPending, isSuccess } =
    usePost("postUser");

  const onSubmit = (data: any) => {
    postMutation({
      url: URLS.USERS,
      data,
    });
  };

  console.log("is valid", isValid);

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-2xl font-bold p-2">
            Full Name
          </label>
          <input
            {...register("fullName")}
            id="fullName"
            type="text"
            placeholder="Ram Bahadur"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-2xl font-bold p-2">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-2xl font-bold p-2">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="password"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Role Selection (Dropdown) */}
        <div>
          <label htmlFor="roles" className="block text-2xl font-bold p-2">
            Role
          </label>
          <select
            {...register("roles.0")}
            id="roles"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            {/* <option value="SCHOOLADMIN">SCHOOL ADMIN</option> */}
            <option value="ADMIN">ADMIN</option>
          </select>
          {errors.roles && (
            <p className="text-red-500">{errors.roles.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isPending}
            className={`w-full h-12 bg-green-400 text-white font-bold rounded-full hover:bg-green-500 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? "Creating..." : "Create User"}
          </button>
        </div>

        {/* Success & Error Messages */}
        {isSuccess && (
          <p className="text-green-500">User created successfully!</p>
        )}
        {isError && (
          <p className="text-red-500">
            {error?.message || "An error occurred"}
          </p>
        )}
      </form>
    </div>
  );
}
