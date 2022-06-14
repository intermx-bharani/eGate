const country = require("../models/countrySchema");
const Country = new country();

const { errorHandler, successHandler } = require("./../helper/handlers");

const createCountry = async (req,res) => {
    try{
        Country.countryName = req.body.countryName
        let result = await Country.save();
        successHandler(req, res, {
            data: result,
            message: "country creation success",
        });
    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}

module.exports = {
    createCountry
}