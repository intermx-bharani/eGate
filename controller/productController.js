const product = require('../models/productSchema');
const Product = new product();

const { errorHandler, successHandler } = require('./../helper/handlers');

//create
const createProduct = async (req,res) => {
    try{
        Product.invoiceNumber = req.body.invoiceNumber;
        Product.poNumber = req.body.poNumber;
        Product.productCode = req.body.productCode;
        Product.productName = req.body.productName;
        Product.productQuantity = req.body.productQuantity;
        Product.modelNumber = req.body.modelNumber;
        Product.invoicePhoto = req.body.invoicePhoto;
        Product.vendorName = req.body.vendorName;

        let result = await Product.save()
        successHandler(req, res, { data: result, message: 'creating product details'})
    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}
//list
const list = async (req,res) => {
    try{
        let result = await product.find({});
        successHandler(req, res, { data: result, message: 'list the product details'})
    }
    catch(err){
        errorHandler(req, res, err, 500);
    }
}

//view
const view = async (req,res) => {
    try{
        const id = req.params.id;
        let result = await product.find({_id:id})
        successHandler(req,res, {data:result,message: 'view the product details'})
    }
    catch(err){
        errorHandler(req,res,err,500);

    }
}
//update
const updateProduct = async (req,res) => {
    try{
        const id =req.body._id;
        let result = await product.updateOne({_id:id},req.body)
        successHandler(req,res, {data:result,message: 'update the product details'})
    }
    catch(err){
        errorHandler(req,res,err,500)
    }
}
//delete
const deleteProduct = async (req,res) => {
    try{
        const id = req.params.id;
        let result= await product.findByIdAndDelete({_id:id})
        successHandler(req,res, {data:result,message: 'update the product details'})
    }
    catch(err){
        errorHandler(req,res,err,500)
    }
}

module.exports = {
    createProduct,list,view,updateProduct,deleteProduct
}