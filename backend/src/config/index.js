import dotenv from "dotenv";

dotenv.config(); 

export const ENV = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  NODE_ENV: process.env.ENV,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_SECURE: process.env.MAIL_SECURE,
  MAIL_FROM: process.env.MAIL_FROM,
  FRONTEND_URL: process.env.FRONTEND_URL
};