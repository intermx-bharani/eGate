const address = require("../models/addressSchema");
const Address = new address();

const { errorHandler, successHandler } = require("./../helper/handlers");

const createAddress = async (req, res) => {
  try {
    Address.doorNo = req.body.doorNo;
    Address.streetName = req.body.streetName;
    Address.areaName = req.body.areaName;
    Address.city = req.body.city;
    Address.state = req.body.state;
    Address.country = req.body.country;
    //    Address.countryName =
    let result = await Address.save();
    successHandler(req, res, {
      data: result,
      message: "address creation success",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

const country = async (req, res) => {
  try {
    let result = await address.aggregate([
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $unwind: "$country",
      },
    ]);
    successHandler(req, res, { data: result, message: "success" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

module.exports = {
  createAddress,
  country
};
