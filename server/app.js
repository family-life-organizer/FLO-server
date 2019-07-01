import express from "express";
import bodyParser from "body-parser";
import debug from "debug";
import morgan from "morgan";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const debugg = debug("app");
const port = process.env.PORT || 6000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);

app.listen(port, () => {
  debugg(`App started at port ${port}`);
});

export default app;
