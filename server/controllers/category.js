import model from "../models";
import UserController from "../controllers/user";
import familyController from "../controllers/family";

const { getFamily } = familyController;
const { findUserById } = UserController;
const { Category, User, Family } = model;

class CategoryController {
  static async createCategory(req, res) {
    const { userId, name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ status: "error", message: "Category name cannot be empty" });
    }
    try {
      const user = await findUserById(userId);
      const category = await Category.findOne({
        where: {
          id: user.family.id,
          name: req.body.name
        }
      });

      if (!category) {
        const cat = await user.family.createCategory({ name });
        if (cat) {
          return res
            .status(201)
            .json({
              status: "success",
              message: "category create successfully"
            });
        }
        return res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      } else {
        return res
          .status(409)
          .json({ status: "error", message: "Category already exists" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error", error });
    }
  }
}

export default CategoryController;
