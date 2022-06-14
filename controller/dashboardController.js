const employeeAvailable = require("../models/employeeAvailable");

const { errorHandler, successHandler } = require("./../helper/handlers");

const employee = async (req,res) => {
    try{
        const Date = req.params.date
        // const Employee = req.body.employee
        let query = await employeeAvailable.find({date: Date})
        // await query.count (function(err,count) {
        //     if (err)
        //         console.log(err)
        //     else
        //         console.log("count is",count)
            successHandler(req, res, {
                data: query,
                message: "count",
              });
        }
        catch(err){
            errorHandler(req,res,err,500)
        }
    }

const visitor = async (req,res) => {
    try{
        
    }
    catch(err){

    }
}  
    // catch(err){
    //     errorHandler(req,        // await query.count (function(err,count) {
        //     if (err)
        //         console.log(err)
        //     else
        //         console.log("count is",count) res, err, 500);
    // }


module.exports = {
    employee,
  };