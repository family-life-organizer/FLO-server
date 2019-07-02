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

  static async updateTask(req, res) {
    let { userId, description, password, lastName, firstName, email } = req.body;
    if (!username && !password && !lastName && !firstName && !email) {
      return res.status(400).json({
        status: "error",
        message: "At least one field must be provided for update to happen"
      });
    }
    try {
      const existingUser = await User.findOne({ where: { id: userId } });

      if (!existingUser) {
        return res.status(404).json({
          status: "error",
          message: "User not found"
        });
      }

      username = username || existingUser.username;
      password = password || existingUser.password;
      email = email || existingUser.email;
      firstName = firstName || existingUser.firstName;
      lastName = lastName || existingUser.lastName;

      const existingUsername = await User.findOne({
        where: {
          username,
          id: {
            [Op.not]: existingUser.id
          }
        }
      });

      if (existingUsername) {
        return res.status(409).json({
          status: "error",
          message: "Username already existing, Kindly choose another username"
        });
      }

      const existingEmail = await User.findOne({
        where: {
          email,
          id: {
            [Op.not]: existingUser.id
          }
        }
      });

      if (existingEmail) {
        return res.status(409).json({
          status: "error",
          message: "Email already existing, Kindly choose another username"
        });
      }

      const hashedPassword = await generateHash(password);

      const updatedUser = await User.update(
        {
          username,
          password: hashedPassword,
          lastName,
          firstName,
          email
        },
        { where: { id: userId } }
      );

      if (updatedUser) {
        return res.status(200).json({
          status: "success",
          message: "User Updated Sucessfully"
        });
      }

      return res
        .status(400)
        .json({ status: "error", message: "Error updating user" });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Error updating user" });
    }
 
  }
}
