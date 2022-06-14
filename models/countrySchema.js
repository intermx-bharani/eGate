const mongoose = require ("mongoose");
const countrySchema = new mongoose.Schema({
    countryName: {
        type: String,
    },
});

module.exports = mongoose.model("country",countrySchema)