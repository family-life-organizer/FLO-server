import Helpers from "../helpers";

import models from "../models";

const { User, Family } = models;
const { generateHash } = Helpers;
class Users {
  static async registerUser(req, res) {
    const {
      lastName,
      firstName,
      email,
      username,
      isAdmin,
      password
    } = req.body;
    try {
      const existingFamily = await User.findOne({ where: { lastName } });

      if (existingFamily) {
        return res.status(409).json({
          status: "error",
          message: "Family already existing, Kindly choose another family name"
        });
      }

      const existingUsername = await User.findOne({ where: { username } });

      if (existingUsername) {
        return res.status(409).json({
          status: "error",
          message: "Username already existing, Kindly choose another username"
        });
      }

      const hashedPassword = await generateHash(password);

      const family = await Family.create({
        name: lastName,
        code: "cheei"
      });
      if (family) {
        const newUser = await family.createUser({
          firstName,
          lastName,
          email,
          username,
          isAdmin,
          password: hashedPassword
        });

        if (newUser) {
          const response = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            username: newUser.username,
            isAdmin: newUser.isAdmin,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
          };

          return res.status(201).json({
            status: "success",
            message: "Family Created",
            data: response
          });
        }
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Error creating user" });
    }
  }
}

export default Users;
