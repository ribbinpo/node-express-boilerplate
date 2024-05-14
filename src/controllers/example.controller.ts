import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

import exampleService from "../services/example.service";
import { ExampleModel } from "../models/example.model";
import { ResponseSuccessMapping } from "../utils/response.util";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  res.send(exampleService.getAll());
};

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  const dataReq = matchedData(req) as ExampleModel;
  const exampleCreated = exampleService.createOne(dataReq);
  return res.status(201).send(
    ResponseSuccessMapping({
      status: 201,
      data: exampleCreated,
      message: "Example created successfully!",
    })
  );
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const dataReq = matchedData(req) as Partial<ExampleModel>;

  const exampleUpdated = exampleService.updateOne(dataReq);

  return res.send(
    ResponseSuccessMapping({
      status: 200,
      data: exampleUpdated,
      message: "Example updated successfully!",
    })
  );
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = matchedData(req) as { id: string };

  const exampleDeleted = exampleService.deleteOne(id);

  res.send(
    ResponseSuccessMapping({
      status: 204,
      data: exampleDeleted,
      message: "Example deleted successfully!",
    })
  );
};

export default {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
