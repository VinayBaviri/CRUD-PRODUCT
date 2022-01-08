const { v4: uuidv4 } = require('uuid');

const productDoc = require("../database/product");
const functions = require("../common/functions");


class UserController {
  constructor() {
  }

  async post(productData, res) {
    const productId = uuidv4();
    const save = await productDoc.saveAndUpdate(productId, productData);
    productData['productId'] = productId;
    functions.sendResponse(201, productData, res);
  }

  async getOneProduct(productId, res) {
    const product = await productDoc.getProductById(productId);
    functions.sendResponse(200, product, res);
  };


  async getAllProducts(res) {
    const products = await productDoc.getAllProducts();
    functions.sendResponse(200, products, res);
  };

  async updateOneProduct(productId, productData, res) {
    const save = await productDoc.saveAndUpdate(productId, productData);
    functions.sendResponse(201, productData, res);
  };

  async deleteById(productId, res) {
    const dele = await productDoc.deleteById(productId);
    functions.sendResponse(200, "product deleted successfully", res);
  };

}

const userController = new UserController();
module.exports = userController;