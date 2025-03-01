"use client";
import React from "react";

export default function NewPasswordForm() {
  return (
    <form
      action="/"
      method="post"
      className="border-black border-2 flex flex-col justify-center items-center gap-y-4 py-8"
    >
      <div className="flex flex-col">
        <label htmlFor="email">Enter your new password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 border-gray-500"
        />
      </div>
      <div className="flex gap-x-4">
        <button className="bg-slate-500 px-4 py-1" type="submit">
          send
        </button>
      </div>
    </form>
  );
}
