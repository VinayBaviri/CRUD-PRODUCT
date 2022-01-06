const router = require("express").Router();

const authController = require("../controller/auth");

router.post('/signup', async (req, res, next) => {
  try {
    const reqData = await authController.verifyAndGetAuthReqData(req, true);
    const resp = await authController.postUser(reqData, res);
  } catch (error) {
    next(error)
  };
});

router.post('/login', async (req, res, next) => {
  try {
    const reqData = await authController.verifyAndGetAuthReqData(req, false);
    const resp = await authController.login(reqData, res);
  } catch (error) {
    next(error)
  };
});



module.exports = router;