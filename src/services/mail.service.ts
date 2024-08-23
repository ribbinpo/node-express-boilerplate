import path from "path";

import { sendMailTemplate } from "../utils/mail.util";

const sendHello = async (to: string, name: string) => {
  console.log(`Sending email to ${to} with name ${name}`);
  try {
    const info = await sendMailTemplate<{ name: string }>({
      to: [to],
      subject: "Hello World",
      htmlPath: path.join(__dirname, "../templates/hello.hbs"),
      params: { name },
    });
  } catch (error) {
    throw error;
  }
};

export default { sendHello };
