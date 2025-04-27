"use client";
import { FormSchema } from "@/validator/createSchool.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import usePost from "@/hooks/usePost";
import { URLS } from "@/constants";

export default function CreateSchool() {
  type SchoolForm = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SchoolForm>({
    resolver: zodResolver(FormSchema),
  });

  const { postMutation, error, isError, isPending, isSuccess } =
    usePost("postSchool");

  const onSubmit = async (data: SchoolForm) => {
    postMutation({ url: URLS.SCHOOL, data });
    reset(); // Reset form after submission
  };

  return (
    <div className="max-w-[20rem] w-full md:max-w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Create School</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* College Name */}
        <div>
          <label htmlFor="name" className="block text-lg font-semibold mb-2">
            College Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Madan Bhandari Memorial College"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* College Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-lg font-semibold mb-2"
          >
            College Location
          </label>
          <input
            {...register("location")}
            id="location"
            type="text"
            placeholder="Kathmandu"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.location && (
            <p className="text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        {/* Mail Suffix */}
        <div>
          <label htmlFor="suffix" className="block text-lg font-semibold mb-2">
            Mail Suffix
          </label>
          <input
            {...register("suffix")}
            id="suffix"
            type="text"
            placeholder="mbmc.edu.np"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.suffix && (
            <p className="text-red-500 mt-1">{errors.suffix.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full bg-green-500 text-white py-3 rounded-md font-bold hover:bg-green-600 disabled:opacity-50"
        >
          {isPending || isSubmitting ? "Creating..." : "Create School"}
        </button>

        {/* Success & Error Messages */}
        {isSuccess && (
          <p className="text-green-500 text-center">
            College created successfully!
          </p>
        )}
        {isError && (
          <p className="text-red-500 text-center">
            {error?.message || "An error occurred"}
          </p>
        )}
      </form>
    </div>
  );
}
