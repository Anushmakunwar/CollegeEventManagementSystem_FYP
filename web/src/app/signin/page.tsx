"use client";

import { TsignUpSchema, signInSchema } from "../../../lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TsignUpSchema>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: TsignUpSchema) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      // response status is not 2xx
      alert("Submitting form failed!");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else {
        alert("Something went wrong!");
      }
    }

    reset();
  };

  return (
    <div className="mx-4">
      <h1 className="text-4xl font-bold mt-32 mx-auto w-fit">SignIn</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="mb-4">
          <input
            {...register("email")}
            type="email"
            placeholder="Your email"
            className="border border-[#EBEAED] font-medium rounded-full w-full text-base py-2 px-6"
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("password")}
            type="password"
            placeholder="Your password"
            className="border border-[#EBEAED] font-medium rounded-full w-full text-base py-2 px-6"
          />
          {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}
        </div>
        <p className="text-xs text-[#E93A7D]">forgot password?</p>
        <button
          disabled={isSubmitting}
          type="submit"
          className="mt-8 block mx-auto text-base font-medium text-white bg-[#25DAC5] rounded-full px-5 py-2"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
