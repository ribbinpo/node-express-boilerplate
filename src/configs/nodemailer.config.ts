import nodemailer from "nodemailer";
import "dotenv/config";

export const transporterConfig = () => {
  return nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: +(process.env.MAIL_PORT || 587),
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // APP Password
    },
  });
};
