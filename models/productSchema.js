const mongoose = require("mongoose");
var productSchema  = new mongoose.Schema({
    invoiceNumber:{
        type: Number
    },
    poNumber:{
        type: Number
    },
    productCode:{
        type: String
    },
    productName:{
        type: String
    },
    productQuantity:{
        type: Number
    },
    modelNumber:{
        type: String
    },
    invoicePhoto:{
        type: String
    },
    vendorName:{
        type: String
    },
})

module.exports = mongoose.model("product", productSchema);