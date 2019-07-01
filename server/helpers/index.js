import bcrypt from "bcrypt";

class Helper {
  static generateHash(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }
}

export default Helper;
