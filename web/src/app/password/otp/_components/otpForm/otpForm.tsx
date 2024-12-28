"use client";
import React from "react";
import useTimer from "../../../../../../hooks/useTimer";

export default function OTPForm() {
  const { isResendAvailable, counter, setCounter } = useTimer();
  return (
    <form
      action="/"
      method="post"
      className="border-black border-2 flex flex-col justify-center items-center gap-y-4 py-8"
    >
      <div className="flex flex-col">
        <label htmlFor="otp">Enter 5 digit otp</label>
        <input
          type="number"
          name="otp"
          id="otp"
          className="border-2 border-gray-500"
        />
      </div>
      {!isResendAvailable ? <p>resend OTP after {counter}s</p> : null}
      <div className="flex gap-x-4">
        <button className="bg-slate-500 px-4 py-1" type="submit">
          Validate
        </button>
        <button
          className={`${!isResendAvailable ? "cursor-not-allowed opacity-25" : ""} bg-slate-500 px-4 py-1`}
          disabled={!isResendAvailable}
          type="reset"
        >
          Resend OTP
        </button>
      </div>
    </form>
  );
}
