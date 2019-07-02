import models from "../models";
import UserController from '../controllers/user'
const { Task } = models;

export default class TaskController {
  static async addTask(req, res) {
    try {
      const { assigneeId } = req.body || { assigneeId: null };
      const { description, dueDate, categoryId, userId } = req.body;
      if (description && dueDate && categoryId) {
        const user = await UserController.findUserById(userId)
        const task = await Task.create({
          description,
          dueDate,
          categoryId,
          familyId: user.family.id,
          assigneeId
        });
        if (task) {
          return res.status(201).json({
            status: "success",
            message: "Task created successfully"
          });
        }
        return res.status(500).json({
          status: "error",
          message: "Internal server error"
        });
      }
      return res.status(400).json({
        status: "error",
        message: "All fields are required"
      });
    } catch (error) {
      console.log("erorrrooro", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error
      });
    }
  }
}
