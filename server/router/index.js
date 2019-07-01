import express from "express";
import models from "../models";
const router = express.Router();

const { User } = models;

router.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Family_org API!"
  })
);

export default router;
