import express from "express";
import Users from "../controllers/user";
import middleware from "../middlewares/authentication";
import Category from "../controllers/category";
import Task from "../controllers/task";
const { addTask, updateTask, completeTask,getFamilyTasks, approveTask } = Task;

const { isAuthenticated, isAdmin } = middleware;
const { createCategory, getFamilyCategories } = Category;
const {
  registerUser,
  loginUser,
  addUser,
  updateProfile,
  getFamilyMembers,
  getUserDetails
} = Users;
const router = express.Router();

router.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Family_org API!!"
  })
);

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post("/addUser", isAdmin, addUser);

router.patch("/profile", isAuthenticated, updateProfile);

router.post("/categories", isAdmin, createCategory);
router.get("/categories/family", isAdmin, getFamilyCategories);
router.get("/users/family", isAdmin, getFamilyMembers);
router.get("/users/:userId", isAuthenticated, getUserDetails);
router.post("/tasks", isAdmin, addTask);
router.get("/tasks/family", isAdmin, getFamilyTasks);
router.patch("/updateTasks/:id", isAdmin, updateTask);
router.patch("/tasks/:taskId", isAuthenticated, completeTask);
router.patch("/tasks/:taskId/approve", isAdmin, approveTask);
export default router;
