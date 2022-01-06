const router = require("express").Router();

const userController = require("../controller/user");


router.post('/', async (req, res, next) => {
  try {
    const userData = req.body;
    const save = await userController.postUser(userData, res);
  } catch (error) { next(error) }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await userController.getAllUsers(req.user, res);
  } catch (error) { next(error) }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const save = await userController.getOneUser(userId, res);
  } catch (error) { next(error) }
});


module.exports = router;