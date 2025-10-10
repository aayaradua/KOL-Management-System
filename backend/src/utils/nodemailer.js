import nodemailer from 'nodemailer';
import { ENV } from '../config/index.js';

export const transporter = nodemailer.createTransport({
  host: ENV.MAIL_HOST,
  port: ENV.MAIL_PORT,
  secure: ENV.MAIL_SECURE, 
  auth: {
    user: ENV.MAIL_USER,
    pass: ENV.MAIL_PASS
  },
});
