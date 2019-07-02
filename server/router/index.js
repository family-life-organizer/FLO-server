import express from "express";
import Users from "../controllers/user";

const { registerUser, loginUser } = Users;
const router = express.Router();

router.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Family_org API!"
  })
);

router.post("/signup", registerUser);

router.post("/login", loginUser);

export default router;
