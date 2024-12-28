import { totp } from "otplib";
totp.options = { digits: 6, step: Number(process.env.OTP_DURATION) };
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

export const generateOTP = () => {
  totp.options = { digits: 6, step: 120 };
  return totp.generate(process.env.OTP_SECRET as string);
};

export const verifyOTP = async (token: string) => {
  totp.options = { digits: 6, step: 120 };
  console.log(process.env.OTP_SECRET, token);
  const x = totp.check(token, process.env.OTP_SECRET as string);
  console.log(x);
  return x;
};
