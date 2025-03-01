import { mailer } from "./mailer";

export const sendEventRegistrationEmail = async (
  userEmail: string,
  eventName: string,
  qrBuffer: Buffer, // Ensure it's a valid Buffer
) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Event Registration</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f9;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }
        .content {
          text-align: center;
          margin: 20px 0;
        }
        .content p {
          font-size: 18px;
          color: #555;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Event Registration Confirmation</h1>
        </div>
        <div class="content">
          <p>You have successfully registered for the event <strong>${eventName}</strong>.</p>
          <p>Please find your QR code below:</p>
          <img src="${qrBuffer}" alt="QR Code" style="max-width: 100%; height: auto;"> <!-- Use cid to reference the attachment -->
        </div>
        <div class="footer">
          <p>Thank you for registering! We look forward to seeing you at the event.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const attachments = [
    {
      filename: "qr-code.png",
      content: qrBuffer, // Ensure it's a valid Buffer
      cid: "qrCode", // Ensure this matches the `src` in the HTML
    },
  ];

  await mailer(userEmail, "Event Registration", html, attachments);
};
