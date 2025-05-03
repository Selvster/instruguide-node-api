import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./db.js";
import routes from "./routes.js";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";
import helmet from "helmet";
import { adminLogin } from "./controllers/AuthController.js";
import cors from "cors";

configDotenv({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("./public"));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.options(
  "*",
  cors({
    origin: "*",
  })
);

app.use("/api/instruments", routes);
app.use("/api/auth/login", adminLogin);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
