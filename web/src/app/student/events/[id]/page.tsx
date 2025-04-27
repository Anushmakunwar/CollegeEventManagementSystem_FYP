"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { URLS } from "@/constants";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format, isBefore, isPast } from "date-fns";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventDetails() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);

  const { isLoading, data } = useGet("eventregister", `${URLS.EVENT}/`, id);
  const { postMutation, isPending } = usePost("eventregister");

  const onSubmit = async () => {
    try {
      await postMutation({
        url: `${URLS.EVENT}/register-event/${data?.data?.id}`,
        data,
      });
    } catch (error) {
      console.log("errrrrrr");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const isRegistrationClosed =
    data?.data?.registrationDeadline &&
    isBefore(new Date(data?.data?.registrationDeadline), new Date());

  const isEventPast =
    data?.data?.startTime && isPast(new Date(data?.data?.startTime));

  const isRegistered = data?.data?.isRegister;

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8">
      {/* <ToastContainer /> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Card className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <CardHeader className="p-6">
            <CardTitle className="text-3xl font-bold text-gray-900">
              {data?.data?.name}
            </CardTitle>
            <p className="text-base text-gray-600 leading-6 mt-2">
              {data?.data?.description}
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center">
                <span className="font-semibold w-32">Host:</span>
                <span className="flex-1">
                  {data?.data?.hostNames?.join(", ") || "N/A"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">Guests:</span>
                <span className="flex-1">
                  {data?.data?.guestNames?.join(", ") || "N/A"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">Venue:</span>
                <span className="flex-1">{data?.data?.venue || "TBD"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">Date:</span>
                <span className="flex-1">
                  {data?.data?.startTime
                    ? format(new Date(data?.data?.startTime), "PPpp")
                    : "TBD"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32">Deadline:</span>
                <span className="flex-1">
                  {data?.data?.registrationDeadline
                    ? format(new Date(data?.data?.registrationDeadline), "P")
                    : "TBD"}
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="mt-4 p-4 rounded-lg bg-red-100">
                <p className="text-sm text-red-800">{errorMessage}</p>
              </div>
            )}

            {isRegistered ? (
              <div className="mt-6 p-4 bg-blue-100 rounded-lg text-center">
                <p className="text-blue-800 font-semibold">
                  You are already registered for this event!
                </p>
              </div>
            ) : isEventPast ? (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600 font-semibold">
                  This event has already occurred
                </p>
              </div>
            ) : isRegistrationClosed ? (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600 font-semibold">
                  Registration is closed
                </p>
              </div>
            ) : (
              <Button
                onClick={onSubmit}
                className={`mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold flex items-center justify-center rounded-xl ${
                  isPending ? "opacity-50 cursor-not-allowed" : "shadow-md"
                }`}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span>Registering...</span>
                  </>
                ) : (
                  "Register Now"
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
