import model from '../models'
const { Category, User, Family } = model;

class CategoryController {
  static async createCategory(req, res) {
    const { userId, name } = req.body;
    if(!name) {
      return res.status(400).json({status:'error', message: 'Category name cannot be empty'});
    }
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Family,
            as: 'family'
          }
        ]
      });

      if ( user && user.isAdmin) {
        const cat = await user.family.createCategory({ name });
        return res.status(201).json({status: 'success', message: 'category create successfully'})
      }
      return res.status(403).json({status:'error', message: 'You dont have permission to create the resource'});
    } catch (error) {
      
    }
  }
}

export default CategoryController