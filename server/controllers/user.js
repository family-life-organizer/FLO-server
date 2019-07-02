import bcrypt from "bcrypt";

import Helpers from "../helpers";
import models from "../models";
import UserValidations from "../validations/user";

const { User, Family } = models;
const { generateHash, generateToken } = Helpers;
class Users {
  static async registerUser(req, res) {
    const { errors, isValid } = UserValidations.validateSignupInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "error", data: errors });
    }

    const { lastName, firstName, email, username, password } = req.body;
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
          isAdmin: true,
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

          const { id } = newUser;
          const token = await generateToken({ id }, process.env.SECRET_OR_KEY);

          return res.status(201).json({
            status: "success",
            message: "Family Created",
            data: response,
            token
          });
        }
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Error creating user" });
    }
  }

  static async loginUser(req, res) {
    const { errors, isValid } = UserValidations.validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "error", data: errors });
    }

    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { username } });

      if (!existingUser) {
        return res.status(404).json({
          status: "error",
          message: "User not found"
        });
      }

      const isPasswordMatch = bcrypt.compareSync(
        password,
        existingUser.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({
          status: "error",
          message: "Wrong Password"
        });
      }
      const { id } = existingUser;
      const token = await generateToken({ id }, process.env.SECRET_OR_KEY);

      return res
        .status(200)
        .json({ status: "success", token, message: "Login Successfull" });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Error creating user", error: err });
    }
  }
}

export default Users;
