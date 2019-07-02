import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const SECRET_OR_KEY = process.env.SECRET_OR_KEY
class Helper {
  static generateHash(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  static generateToken(payload) {
    const token = jwt.sign(payload, SECRET_OR_KEY, { expiresIn: 5600 });
    return token;
  }

  static async decodeToken(token) {
    try {
      const decoded = await jwt.verify(token, SECRET_OR_KEY)
      if(decoded) {
        return decoded;
      }
      return null
    } catch (error) {
      return null
    }
  }
}

export default Helper;
