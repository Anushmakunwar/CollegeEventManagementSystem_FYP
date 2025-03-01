type Email = {
  username: string;
  email: string;
  password: string;
  redirectURL: string;
};

export function generateEmailMarkup(data: Email) {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to College Event Management System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        .button {
            display: inline-block;
            background: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome to College Event Management System!</h2>
        <p>Dear ${data.username},</p>
        <p>We are excited to have you on board! Your account has been successfully created, and you can now log in to the platform using the credentials below:</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Password:</strong> ${data.password}</p>
        <p>For security reasons, we recommend changing your password after logging in.</p>
        <a href="${data.redirectURL}" class="button">Login Now</a>
        <p class="footer">If you have any questions or need assistance, feel free to contact our support team.</p>
        <p class="footer">Best regards,<br>College Event Management System Team</p>
    </div>
</body>
</html>`;
}
