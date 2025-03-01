"use client";
import { useState, useEffect } from "react";
import QRCodeGenerator from "qrcode";

const QRData = {
  eventId: "event123",
  userId: "user123",
};

export default function QRCode() {
  const [QRSource, setQRSource] = useState("");

  const generate = () => {
    QRCodeGenerator.toString(JSON.stringify(QRData)).then(setQRSource);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <>
      {QRSource && (
        <div
          className="h-[256px] w-[256px]"
          dangerouslySetInnerHTML={{ __html: QRSource }}
        ></div>
      )}
    </>
  );
}
