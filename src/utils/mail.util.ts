import fs from "fs";
import handlebars from "handlebars";

import { transporterConfig } from "../configs/nodemailer.config";

export const sendMailTemplate = async <T>({
  to,
  subject,
  htmlPath,
  params,
}: {
  to: string[];
  subject: string;
  htmlPath: string;
  params: T;
}) => {
  const transporter = transporterConfig();

  const emailTemplateSource = fs.readFileSync(htmlPath, "utf8");

  const template = handlebars.compile(emailTemplateSource);
  const htmlToSend = template(params);

  const info = await transporter.sendMail({
    from: {
      name: process.env.MAIL_NAME || "name",
      address: process.env.MAIL_USER || "",
    }, // sender address
    to, // list of receivers
    subject, // Subject line
    html: htmlToSend, // html body
  });
  return info;
};
