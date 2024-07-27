import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

import exampleService from "../services/example.service";
import { ExampleModel } from "../models/example.model";
import { successHandler } from "../utils/response.util";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(exampleService.getAll());
  } catch (error) {
    next(error);
  }
};

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  const dataReq = matchedData(req) as ExampleModel;
  try {
    const exampleCreated = exampleService.createOne(dataReq);
    return res.status(201).send(
      successHandler({
        status: 201,
        data: exampleCreated,
        message: "Example created successfully!",
      })
    );
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const dataReq = matchedData(req) as Partial<ExampleModel>;

  try {
    const exampleUpdated = exampleService.updateOne(dataReq);

    return res.send(
      successHandler({
        status: 200,
        data: exampleUpdated,
        message: "Example updated successfully!",
      })
    );
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = matchedData(req) as { id: string };
  try {
    const exampleDeleted = exampleService.deleteOne(id);

    res.send(
      successHandler({
        status: 204,
        data: exampleDeleted,
        message: "Example deleted successfully!",
      })
    );
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
