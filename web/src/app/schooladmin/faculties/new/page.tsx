"use client";
import { URLS } from "@/constants";
import usePost from "@/hooks/usePost";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

type FacultyType = {};

export default function page() {
  const { postMutation, isSuccess, data, error, isPending, isError } =
    usePost("Faculty_API");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>();

  const onSubmit = (data: any) => {
    postMutation({ url: URLS.FACULTY, data });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Faculty created successfully!");
      reset();
    } else if (isError) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  }, [isSuccess, isError]);

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Create Faculty
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="faculty"
            className="block text-xl font-medium text-gray-700 mb-2"
          >
            Enter Faculty Name
          </label>
          <input
            type="text"
            id="faculty"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter Faculty Name"
            {...register("name", { required: "Faculty name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full h-12 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:opacity-50 transition duration-300"
          >
            {isPending ? "Creating..." : "Create Faculty"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
