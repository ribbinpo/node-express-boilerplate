import { NextFunction, Request, Response } from "express";

import mailService from "../services/mail.service";
import { SuccessHandler } from "../utils/response.util";
import { matchedData } from "express-validator";

const sendHello = async (req: Request, res: Response, next: NextFunction) => {
  const dataReq = matchedData(req) as {
    to: string;
    name: string;
  };

  try {
    await mailService.sendHello(dataReq.to, dataReq.name);
    return new SuccessHandler({ message: "Email sent successfully" }).send(res);
  } catch (error) {
    next(error);
  }
};

export default { sendHello };
