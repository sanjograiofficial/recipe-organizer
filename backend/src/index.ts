import express from "express";
import cors from "cors";
import "dotenv/config";

import routes from "./routes/routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_PORT!,
  }),
);

app.use("/", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
