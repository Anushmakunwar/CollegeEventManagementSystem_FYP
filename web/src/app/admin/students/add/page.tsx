"use client";
import { FormSchema } from "@/validator/createUser.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import usePost from "@/hooks/usePost";
import { URLS } from "@/constants";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function CreateUser() {
  type User = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<User>({
    resolver: zodResolver(FormSchema),
  });

  const { postMutation, error, isError, isPending, isSuccess } =
    usePost("postUser");

  const onSubmit = async (data: User) => {
    postMutation({ url: URLS.USERS, data });
    reset(); // Reset form after submission
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Student created successfully");
    } else if (isError) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  }, [isSuccess, isError]);

  return (
    <div className="max-w-[20rem] w-full md:max-w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Student</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-lg font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            {...register("fullName")}
            id="fullName"
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.fullName && (
            <p className="text-red-500 mt-1">{errors.fullName.message}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-lg font-semibold mb-2">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-lg font-semibold mb-2"
          >
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        {/* Role Selection */}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full bg-green-500 text-white py-3 rounded-md font-bold hover:bg-green-600 disabled:opacity-50"
        >
          {isPending || isSubmitting ? "Creating..." : "Create User"}
        </button>
        {/* Success & Error Messages */}
        <ToastContainer />
      </form>
    </div>
  );
}
