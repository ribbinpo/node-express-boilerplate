import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running :)");
});

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running on ${port}`);
});

// For integration testing
export default app;