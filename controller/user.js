const { v4: uuidv4 } = require('uuid');

const userDoc = require("../database/user");
const functions = require("../common/functions");


class UserController {
  constructor() {
  }

  async postUser(userData, res) {
    const userId = uuidv4();
    const save = await userDoc.saveAndUpdate(userId, userData);
    userData['userId'] = userId;
    functions.sendResponse(201, userData, res);
  }

  async getOneUser(userId, res) {
    const user = await userDoc.getUserById(userId);
    functions.sendResponse(200, user, res);
  };


  async getAllUsers(user, res) {
    if (!user || !user.role || user.role !== 'admin') {
      throw ({ status: 401, message: "Your role is not sufficient to get required data" });
    };
    const users = await userDoc.getAllUsers();
    functions.sendResponse(200, users, res);
  }

}

const userController = new UserController();
module.exports = userController;