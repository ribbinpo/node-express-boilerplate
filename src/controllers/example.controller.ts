import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

import exampleService from "../services/example.service";
import { ExampleModel } from "../models/example.model";
import { SuccessHandler } from "../utils/response";

const getAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    return new SuccessHandler(200, {
      result: exampleService.getAll(),
    }).handle(res);
  } catch (error) {
    next(error);
  }
};

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  const dataReq = matchedData(req) as ExampleModel;
  try {
    const exampleCreated = exampleService.createOne(dataReq);
    return new SuccessHandler(201, {
      result: exampleCreated,
      message: "Example created successfully!",
    }).handle(res);
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const dataReq = matchedData(req) as Partial<ExampleModel>;
  try {
    const exampleUpdated = exampleService.updateOne(dataReq);
    return new SuccessHandler(200, {
      result: exampleUpdated,
      message: "Example updated successfully!",
    }).handle(res);
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = matchedData(req) as { id: string };
  try {
    const exampleDeleted = exampleService.deleteOne(id);
    return new SuccessHandler(204, {
      result: exampleDeleted,
      message: "Example deleted successfully!",
    }).handle(res);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
