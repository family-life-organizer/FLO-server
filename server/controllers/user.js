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
    
        // const existingFamily = await User.findOne({ where: { lastName } });
    
        // if (existingFamily) {
        //   return res.status(409).json({ status: "error", message: "Family already existing, Kindly choose another family name" });
        // }
    
        // const existingUsername = await User.findOne({ where: { username } });
    
        // if (existingUsername) {
        //   return res.status(409).json({ status: "error", message: "Username already existing, Kindly choose another username" });
        // }
    
        // const response = {
        //   id: user.id,
        //   firstName: user.firstName,
        //   lastName: user.lastName,
        //   email: user.email,
        //   username: user.username,
        //   isAdmin: user.isAdmin,
        //   createdAt: user.createdAt,
        //   updatedAt: user.updatedAt
        // };
    
        const family = await Family.create({
          name: lastName,
          code: "cheei"
        });
        if (family) {
          //   return res
          //     .status(201)
          //     .json({ status: "success", message: "Family created successfully" });
          const newUser = await family.createUser({
            firstName,
            lastName,
            email,
            username,
            isAdmin
          });
          console.log(newUser);
        }
      }
      catch (err) {
          console
        return res.status(500).json("error")
      }
    

    // const newUser = await User.create({
    //   firstName,
    //   lastName,
    //   email,
    //   isAdmin,
    //   username
    // });

    // console.log(newUser.lastName)
    // if (newUser) {

    // }
    //   .then(res => console.log(res))
    //   .catch(err => res.status(400).json({error: 'Unable to register user'}));

    res.json("me");
    // return res.status(201).json({ status: "success", data: response });
  }
}

export default Users;
