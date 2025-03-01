"use client";
import { FormSchema } from "@/validator/createSchool.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import usePost from "@/hooks/usePost";
import { URLS } from "@/constants";

export default function CreateSchool() {
  type school = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<school>({
    resolver: zodResolver(FormSchema),
  });

  const { postMutation, error, isError, isPending, isSuccess } =
    usePost("postSchool");

  const onSubmit = (data: school) => {
    console.log(data, "submit data");
    postMutation({ url: URLS.SCHOOL, data });
  };

  return (
    <div>
      <h2>Create School</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* College Name */}
        <div>
          <label htmlFor="name" className="block text-2xl font-bold p-2">
            College Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Madan Bhandari Memorial College"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* College Location */}
        <div>
          <label htmlFor="location" className="block text-2xl font-bold p-2">
            College Location
          </label>
          <input
            {...register("location")}
            id="location"
            type="text"
            placeholder="Kathmandu"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Mail Suffix */}
        <div>
          <label htmlFor="suffix" className="block text-2xl font-bold p-2">
            Mail Suffix
          </label>
          <input
            {...register("suffix")}
            id="suffix"
            type="text"
            placeholder="mbmc.edu.np"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.suffix && (
            <p className="text-red-500">{errors.suffix.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isPending}
            className={`w-full h-12 bg-green-400 text-white font-bold rounded-full hover:bg-green-500 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Creating..." : "Create School"}
          </button>
        </div>

        {/* Success & Error Messages */}
        {isSuccess && (
          <p className="text-green-500">College created successfully!</p>
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
