import models from "../models";

const { Family } = models;
export default class FamilyController {
  static async getFamily(query) {
    try {
      const family = await Family.findOne({
        where: query
      });
      return family;
    } catch (error) {
      return null;
    }
  }
}
