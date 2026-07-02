import bcrypt from "bcryptjs";
import crypto from "node:crypto";
const passRound = 3;

export const bcryptPass = async (string) => {
  const salt = await bcrypt.genSalt(passRound);
  return bcrypt.hash(string, salt);
};

export const compareBcrypt = (bcrString, originalString) => {
  return bcrypt.compare(originalString, bcrString);
};

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const generateToken = (size = 32) => {
  return crypto.randomBytes(size).toString("hex");
};