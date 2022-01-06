


const sendResponse = (status = 200, data, res) => {
  return res.status(status).send(data);
};


module.exports = {
  sendResponse: sendResponse
}