import models from "../models";
import UserController from '../controllers/user'
const { Task, User } = models;

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
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error
      });
    }
  }
  static async completeTask(req, res) {
    try {
      const { userId } = req.body;
      const user = await User.findByPk(userId);
      const { taskId } = req.params
      const task  = await Task.findByPk(taskId);
      if (!task) {
        return res.status(400).json({ status: 'error', message: 'Task Not Found'});
      }
      if (task.assigneeId === userId || user.isAdmin) {
        const updated = await task.update({ status: 'completed'});
        return res.status(200).json({status: 'success', message: 'Task updated'});
      }
      return res.status(403).json({ status: 'error', message: 'No permitted'});
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Internal server error', error});
    }
  }
}
