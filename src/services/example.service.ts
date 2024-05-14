import { ExampleModel } from "../models/example.model";

const getAll = async () => {
  return "getAll";
};

const createOne = async (example: ExampleModel) => {
  return example;
};

const updateOne = async (example: Partial<ExampleModel>) => {
  return example;
};

const deleteOne = async (id: string) => {
  return id;
};

export default {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
