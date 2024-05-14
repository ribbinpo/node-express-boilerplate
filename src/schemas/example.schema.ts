import { body, param } from "express-validator";

const create = () => {
  return [
    body("name").isString().trim().notEmpty(),
    body("description").isString().notEmpty(),
  ];
};

const update = () => {
  return [
    param("id").isString().notEmpty(),
    body("name").isString().trim().optional(),
    body("description").isString().optional(),
  ];
};

export default {
  create,
  update,
};
