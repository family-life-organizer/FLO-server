import bcrypt from "bcrypt";
import { Op } from "sequelize";
import Helpers from "../helpers";
import models from "../models";
import UserValidations from "../validations/user";
import FamilyController from "./family";

const { getFamily } = FamilyController;
const { User, Family, Task } = models;
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
      // const existingFamily = await User.findOne({ where: { lastName } });

      // if (existingFamily) {
      //   return res.status(409).json({
      //     status: "error",
      //     message: "Family already existing, Kindly choose another family name"
      //   });
      // }

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
        code: "azxbkjahskh"
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

    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }]
        }
      });
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
      const { id, familyId } = existingUser;
      const { firstName, lastName, isAdmin } = existingUser

      const family = await getFamily({ id: familyId });
      const token = await generateToken({ id }, process.env.SECRET_OR_KEY);

      return res.status(200).json({
        status: "success",
        user: { firstName, lastName, isAdmin, username},
        family,
        token,
        message: "Login Successfull"
      });
    } catch (err) {
      console.log(err)
      return res
        .status(500)
        .json({ status: "error", message: "Error creating user" });
    }
  }

  static async addUser(req, res) {
    const { errors, isValid } = UserValidations.validateAddUserInput(req.body);

    // // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "error", data: errors });
    }

    const { username, password } = req.body;
    try {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(409).json({
          status: "error",
          message: "Username already existing, Kindly choose another username"
        });
      }

      const hashedPassword = await generateHash(password);

      const newUser = await User.create({
        username,
        password: hashedPassword,
        familyId: req.body.userId
      });

      if (newUser) {
        const response = {
          id: newUser.id,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        };

        return res.status(201).json({
          status: "success",
          message: "User Created Sucessfully",
          data: response
        });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Error creating user" });
    }
  }

  static async updateProfile(req, res) {
    let { userId, username, password, lastName, firstName, email } = req.body;
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

  static async findUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Family,
            as: "family"
          }
        ]
      });
      if (user) return user;
      return null;
    } catch (error) {
      return null;
    }
  }

  static async getFamilyMembers(req, res) {
    try {
      const { userId } = req.body
      const user = await User.findByPk(userId);
      const familyMembers = await User.findAll({
        where: {
          familyId: user.familyId
        },
        attributes: ['id', 'firstName', 'lastName', 'isAdmin', 'username', 'email']
      });
      if(familyMembers) {
        return res.status(200).json({
          status: 'success',
          message: 'success',
          data: familyMembers
        })
        return res.status(404).json({
          status: 'error',
          message: 'No member found for the family',
        })
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
    
  }

  static async getUserDetails(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'isAdmin'],
        include: [
          {
            model: Family,
            as: 'family'
          },
          {
            model: Task,
            as: 'tasks'
          },
        ]
      });
      if(user) {
        return res.status(200).json({
          status: 'success',
          message: 'success',
          data: user
        })
      }
      return res.status(404).json({
        status: 'error',
        message: 'User Not found',
      })
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  }
}

export default Users;
