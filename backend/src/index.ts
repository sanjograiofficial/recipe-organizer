import express from "express";
import "dotenv/config";
import routes from "./routes/routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
