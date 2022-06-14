const employee = require("../models/empSchema");
const role = require("../models/roles");

var generator = require("generate-password");

require("dotenv").config();
const { errorHandler, successHandler } = require("./../helper/handlers");
const { getMaxListeners } = require("../models/empSchema");
const bcrypt = require("bcrypt");
const sendMail = require("../mailer/sendMail");

//create
const createUser = async (req, res) => {
  try {
    let Employee = new employee();
    let Role = new role();

    let pwd = generator.generate({
      length: 8,
      numbers: true,
      unique: true,
    });

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(pwd, salt);

    Employee.empId = req.body.empId;
    Employee.firstName = req.body.firstName;
    Employee.lastName = req.body.lastName;
    Employee.email = req.body.email;
    Employee.password = encryptedPassword;
    Employee.status = req.body.status;
    Employee.isActive = true;
    Employee.address = req.body.address;
    Employee.contactNo = req.body.contactNo;
    Employee.employeeImage = req.body.employeeImage;
    Employee.role = req.body.role;
    
    

    sendMail.sendMail(Employee.email, pwd);
    let result = await Employee.save();

    const roleid = Employee.role;
    console.log(roleid)
    const R = await role.findOne({_id:roleid})
    const RoleName = R.roleName
    console.log(RoleName);
    Employee.roleName=RoleName;

    successHandler(req, res, {
      data: result,
      message: "user creation success",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

const joinEmployee = async (req, res) => {
  try {
    let result = await employee.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },{$unwind:"$role"},
      {
        $lookup: {
          from: "status",
          localField: "status",
          foreignField: "_id",
          as: "status",
        },
      },{$unwind:"$status"},
      {
        $lookup: {
          from: "addresses",
          localField: "address",
          foreignField: "_id",
          as: "address",
        },
      },{$unwind:"$address"},
    ]);
    successHandler(req, res, { data: result, message: "join" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//list

const userList = async (req, res) => {
  try {
    let result = await employee.find({ isActive: true });
    successHandler(req, res, { data: result, message: "view the all user" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//view details

const getUsers = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await employee.find({ _id: id });
    successHandler(req, res, {
      data: result,
      message: "view the user details",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//delete

const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    // const userId = req.params.userId;
    let result = await employee.findByIdAndDelete({ _id: id });
    successHandler(req, res, { Employee: result, message: "delete the user" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//soft delete
const inActive = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    let result = await employee.findByIdAndUpdate(id, {
      $set: { isActive: false },
    });
    // let result = await employee.updateOne(id, {status : false} )
    successHandler(req, res, { Employee: result, message: "soft delete" });
    // nxt()
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//update
const updateUser = async (req, res) => {
  console.log("update");
  try {
    const id = req.body._id;
    console.log(id);
    let result = await employee.updateOne({ _id: id }, req.body);
    successHandler(req, res, { Employee: result, message: "update" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//search

const searchUser = async (req, res) => {
  try {
    const data = req.body;
    // console.log(id)
    let result = await employee.find(
      {
        $or: [
          { firstName: { $regex: `${data}` } },
          { email: { $regex: `${data}` } },
          // {contactNo: { $in: `${data}` }},
        ],
      }
      // console.log(data)
    );
    successHandler(req, res, { data: result, message: "search" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

module.exports = {
  createUser,
  userList,
  getUsers,
  deleteUsers,
  inActive,
  updateUser,
  searchUser,
  joinEmployee
};
