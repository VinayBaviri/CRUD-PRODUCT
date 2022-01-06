const userDoc = require("../model/user");

class UserDB {
  constructor() {
  }

  saveAndUpdate(userId, userData) {
    return userDoc.updateOne(
      { userName: userData.userName, userId: userId },
      {
        userId: userId,
        userName: userData.userName,
        userData: userData.userData
      },
      {
        upsert: true
      }
    ).then(() => {
      return "User Data saved.";
    })
  }

  getUserById(userId) {
    return userDoc.findOne({ userId: userId })
      .then(data => {
        return data ? data : null;
      })
  };

  getAllUsers() {
    return userDoc.find()
      .then(data => {
        return data ? data : null;
      })
  }
};

const userDB = new UserDB();
module.exports = userDB;