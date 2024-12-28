"use client";
import React from "react";

export default function EmailForm() {
  return (
    <form
      action="/"
      method="post"
      className="border-black border-2 flex flex-col justify-center items-center gap-y-4 py-8"
    >
      <div className="flex flex-col">
        <label htmlFor="email">Enter your email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 border-gray-500"
        />
      </div>
      <div className="flex gap-x-4">
        <button className="bg-slate-500 px-4 py-1" type="submit">
          Validate
        </button>
      </div>
    </form>
  );
}
