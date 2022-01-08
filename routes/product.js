const router = require("express").Router();

const productController = require("../controller/product");


router.post('/', async (req, res, next) => {
  try {
    const productData = req.body;
    const save = await productController.post(productData, res);
  } catch (error) { next(error) }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await productController.getAllProducts(res);
  } catch (error) { next(error) }
});

router.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const save = await productController.getOneProduct(productId, res);
  } catch (error) { next(error) }
});

router.put("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const save = await productController.updateOneProduct(productId, productData, res);
  } catch (error) { next(error) }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const save = await productController.deleteById(productId, res);
  } catch (error) { next(error) }
});


module.exports = router;