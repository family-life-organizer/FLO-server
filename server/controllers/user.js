import models from "../models";

const { User, Family } = models;

class Users {
  static async registerUser(req, res) {
    try {
      let firstName = "Ezekiel";
      let lastName = "Ekunola";
      let email = "ekunolaeasybuoy@gmail.com";
      let isAdmin = true;
      let username = "easybuoy";

      const existingFamily = await User.findOne({ where: { lastName } });

      if (existingFamily) {
        return res.status(409).json({ status: "error", message: "Family already existing, Kindly choose another family name" });
      }

      const existingUsername = await User.findOne({ where: { username } });

      if (existingUsername) {
        return res.status(409).json({ status: "error", message: "Username already existing, Kindly choose another username" });
      }

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
          isAdmin
        });

        if (user) {
          const response = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          };

          return res.status(201).json({status: 'success', message: 'Family Created'})
        }
      }
    } catch (err) {
      return res.status(500).json("error");
    }
  }
}

export default Users;
