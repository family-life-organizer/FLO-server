import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Helper {
  static generateHash(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  static generateToken(payload, SECRET_OR_KEY) {
    const token = jwt.sign(payload, SECRET_OR_KEY, { expiresIn: 3600 });

    return `Bearer ${token}`;
    console.log(me, "===");
  }
}

export default Helper;
