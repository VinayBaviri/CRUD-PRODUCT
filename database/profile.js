const profileDoc = require("../model/profile");

class ProfileDB {
  constructor() {
  }

  save(obj) {
    return profileDoc.updateOne(
      { userName: obj.userName, role: obj.role },
      {
        role: obj.role,
        userName: obj.userName,
        password: obj.password
      },
      {
        upsert: true
      }
    ).then(() => {
      return "Profile Data saved.";
    })
  }

  getUser(userName) {
    return profileDoc.findOne({ userName: userName }).limit(1)
      .then(data => {
        return data ? data : null;
      })
  }
};

const profileDB = new ProfileDB();
module.exports = profileDB;