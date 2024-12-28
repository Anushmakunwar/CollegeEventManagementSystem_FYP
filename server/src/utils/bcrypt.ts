import * as bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  console.log("g", password);
  const pass = await bcrypt.hash(password, 10);
  console.log("g", pass);
  return pass;
};

const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };
