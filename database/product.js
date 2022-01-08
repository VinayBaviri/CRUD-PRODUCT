const productDoc = require("../model/product");

class UserDB {
  constructor() {
  }

  saveAndUpdate(productId, productData) {
    return productDoc.findOneAndUpdate(
      { productId: productId },
      {
        productId: productId,
        productName: productData.productName,
        productData: productData.productData
      },
      {
        upsert: true
      }
    ).then(() => {
      return "User Data saved.";
    })
  }

  updateById(productId) {
    return productDoc.findByIdAndUpdate({ productId: productId })
      .then(data => {
        return data ? data : null;
      })
  }

  getProductById(productId) {
    return productDoc.findOne({ productId: productId })
      .then(data => {
        return data ? data : null;
      })
  };

  getAllProducts() {
    return productDoc.find()
      .then(data => {
        return data ? data : null;
      })
  };

  deleteById(productId) {
    return productDoc.deleteOne({ productId: productId })
      .then(() => {
        return "Product deleted successfully.";
      })
  };

};

const userDB = new UserDB();
module.exports = userDB;