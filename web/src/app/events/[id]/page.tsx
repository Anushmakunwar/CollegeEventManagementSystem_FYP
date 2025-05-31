import React from "react";
import QRCode from "./_components/qrCode";

export default function page() {
  return (
    <div className="mx-4">
      <h1 className="text-xl font-medium mt-8">Event Name</h1>
      <p className="leading-6 mt-2">
        Dear, Event subtitle students this event welcome you to join for
        effective session on mental health and it's rising effect on student.
      </p>
      <p className="mt-6 mb-4">Event Detail:</p>
      <div className="mb-2">
        <p>
          <span className="text-xs font-bold leading-5">Host:</span>{" "}
          <span className="text-xs leading-5">Samion Limbu, Bob county</span>
        </p>
        <p>
          <span className="text-xs font-bold leading-5">Guests:</span>{" "}
          <span className="text-xs leading-5"> Brcue Lee, Vladimir Putin</span>
        </p>
        <p>
          <span className="text-xs font-bold leading-5">Venue:</span>{" "}
          <span className="text-xs leading-5">
            Kumari Hall
          </span>
        </p>
        <p>
          <span className="text-xs font-bold leading-5">Event date:</span>{" "}
          <span className="text-xs leading-5">May 24, 2024</span>
        </p>
        <p>
          <span className="text-xs font-bold leading-5">
            Registration dead-line:
          </span>{" "}
          <span className="text-xs leading-5">May 23, 2024</span>
        </p>
        <p>
          <span className="text-xs font-bold leading-5">Faculty:</span>{" "}
          <span className="text-xs leading-5">BCA</span>
        </p>
      </div>
      <button
        type="submit"
        className="block text-base font-medium text-white bg-[#25DAC5] rounded-full px-5 py-2"
      >
        Register
      </button>
      <div className="mt-8">
        <p className="text-xl text-center">Event Pass</p>
        <div className="mt-2 flex justify-center">
          <QRCode />
        </div>
      </div>
    </div>
  );
}
