"use client";
import { URLS } from "@/constants";
import usePost from "@/hooks/usePost";
import React from "react";
import { useForm } from "react-hook-form";

type FacultyType = {};

export default function page() {
  const { postMutation, isSuccess, data, isPending } = usePost("Faculty_API");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  const onSubmit = (data: any) => {
    // console.log(data, isPending);
    postMutation({ url: URLS.FACULTY, data });
  };

  return (
    <div>
      <h2>Create Faculty</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="faculty" className="block text-2xl font-bold p-2">
            Enter Faculty Name
          </label>
          <input
            type="text"
            id="faculty"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
            {...register("name", { required: "Faculty is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full h-12 bg-green-400 text-white font-bold rounded-full hover:bg-green-500"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
