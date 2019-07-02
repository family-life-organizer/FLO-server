import express from "express";
import Users from "../controllers/user";
import middleware from '../middlewares/authentication'
import Category from '../controllers/category'

const { isAuthenticated } = middleware;
const { createCategory }  = Category
const { registerUser, loginUser } = Users;
const router = express.Router();

router.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Family_org API!!"
  })
);

router.post("/signup", registerUser);

router.post("/login", loginUser);
router.post('/categories', isAuthenticated, createCategory )
export default router;
