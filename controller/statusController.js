const status = require("../models/statusSchema");
const Status = new status();

const { errorHandler, successHandler } = require("./../helper/handlers");

const createStatus = async (req, res) => {
  try {
    Status.statusName = req.body.statusName;
    Status.statusType = req.body.statusType;
    let result = await Status.save();
    successHandler(req, res, {
      data: result,
      message: "status creation success",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

const listStatus = async (req, res) => {
  try {
    let result = await status.find({});
    successHandler(req, res, { data: result, message: "view the status" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

module.exports = {
  createStatus,
  listStatus,
};
