import { body } from "express-validator";

const send = () => {
  return [body("to").isEmail().notEmpty(), body("name").isString().notEmpty()];
};

export default {
  send,
};
