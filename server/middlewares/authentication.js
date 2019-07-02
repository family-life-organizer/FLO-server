import helper from "../helpers";
import UserController from "../controllers/user";

const { findUserById } = UserController;
const { decodeToken } = helper;
class Authentication {
  static async isAuthenticated(req, res, next) {
    const { authorization: token } = req.headers || null;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "You must login to create a category"
      });
    }
    const { id } = await decodeToken(token) || { id: null };
    if (!id) {
      return res.status(401).json({
        status: "error",
        message: "You must login to create a category"
      });
    }
    req.body.userId = id;
    next();
  }
  static async isAdmin(req, res, next) {
    const { authorization: token } = req.headers || null;
    if (!token) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized Request"
      });
    }
    const { id } = (await decodeToken(token)) || { id: null };
    if (!id) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized Request"
      });
    }
    const user = await findUserById(id);
    if (user && user.isAdmin) {
      req.body.userId = user.id
      next();
    } else {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized Request"
      });
    }
  }
}

export default Authentication;
