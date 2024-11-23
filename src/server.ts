import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routes";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running :)");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// For integration testing
export default app;
