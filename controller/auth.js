
const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");
const functions = require('../common/functions');

const profileDB = require("../database/profile");

const jwtExpiry = Number(process.env.JWT_EXPIRY);

class AuthController {

  constructor() {
  }

  async verifyAndGetAuthReqData(req, isSginup) {
    const userName = req.body.userName ? req.body.userName : null;
    const password = req.body.password ? req.body.password : null;
    const profilePic = req.body.profilePic ? req.body.profilePic : null;
    if (!userName || !userName.toString().trim().length) {
      throw ({ status: 400, message: "userName required" });
    } if (!password || !password.toString().trim().length) {
      throw ({ status: 400, message: "password required" });
    } if (isSginup && (!profilePic || !profilePic.toString().trim().length)) {
      throw ({ status: 400, message: "profilePic required" });
    }

    const isUserExist = await profileDB.getUser(userName);
    if (isSginup && isUserExist) {
      throw ({ status: 403, message: "User already exist" });
    } else if (!isSginup && !isUserExist) {
      throw ({ status: 401, message: "Invalid Credentials" });
    }

    return {
      userName: userName,
      password: password,
      profilePic: (isSginup) ? profilePic : isUserExist.profilePic
    };
  };

  async postUser(reqData, res) {
    const hashedPassword = await bcrypt.hash(reqData.password, 10);
    const save = await profileDB.save({ userName: reqData.userName, password: hashedPassword, profilePic: reqData.profilePic });
    this.generateTokenAndSendResponse(reqData, res, 201);
  };

  generateTokenAndSendResponse(userData, res, status) {
    const jwtToken = this.generateToken(userData);
    const respObj = {
      profilePic: userData.profilePic,
      expiresIn: jwtExpiry,
      accessToken: jwtToken,
      userName: userData.userName,
    }
    functions.sendResponse(status, respObj, res);
  };

  verifyToken(authorizationHeader) {
    try {
      const token = authorizationHeader.split(' ')[1];
      return JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw error
    };
  };

  async login(reqData, res) {
    const user = await profileDB.getUser(reqData.userName);
    if (!user) { return functions.sendResponse(401, "user Details not exist", res); };
    const isPasswordMatched = await bcrypt.compare(reqData.password, user.password);
    if (!isPasswordMatched) { return functions.sendResponse(401, "Invalid Credentials", res); };
    this.generateTokenAndSendResponse(user, res, 200);
  }

  generateToken(userData) {
    return JWT.sign(
      { userName: userData.userName },
      process.env.JWT_SECRET, { expiresIn: jwtExpiry }
    )
  };


};

const authController = new AuthController();
module.exports = authController;