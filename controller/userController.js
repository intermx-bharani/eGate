const employee = require("../models/empSchema");
const role = require("../models/roles");
const fs = require("fs");


var generator = require("generate-password");

require("dotenv").config();
const { errorHandler, successHandler } = require("./../helper/handlers");
const bcrypt = require("bcrypt");
const sendMail = require("../mailer/sendMail");

const hasAccess = (roles = [], user = {}) => {
  return roles.includes(user.roleName);
};
const requiredRole = ["admin"];

//create

const createUser = async (req, res) => {
  try {
    let loginUser = req.user;
    let access = hasAccess(requiredRole, loginUser);
    if (!access) {
      return errorHandler(req, res, { message: "invalid" }, 500);
    }
    let Employee = new employee();

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
    const R = await role.findOne({ _id: roleid });
    const RoleName = R.roleName;
    Employee.roleName = RoleName;
    Employee.save();

    successHandler(req, res, {
      data: result,
      message: "user creation success",
    });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//join view

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
      },
      { $unwind: "$role" },
      {
        $lookup: {
          from: "status",
          localField: "status",
          foreignField: "_id",
          as: "status",
        },
      },
      { $unwind: "$status" },
      {
        $lookup: {
          from: "addresses",
          localField: "address",
          foreignField: "_id",
          as: "address",
        },
      },
      { $unwind: "$address" },
    ]);
    successHandler(req, res, { data: result, message: "joining list" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//list

const userList = async (req, res) => {
  try {
    let loginUser = req.user;
    let access = hasAccess(requiredRole, loginUser);
    if (!access) {
      return errorHandler(req, res, { message: "invalid" }, 500);
    }

    let result = await employee.find({ isActive: true });
    successHandler(req, res, { data: result, message: "view the all user" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//view details

const getUsers = async (req, res) => {
  try {
    let loginUser = req.user;
    let access = hasAccess(requiredRole, loginUser);
    if (!access) {
      return errorHandler(req, res, { message: "invalid" }, 500);
    }
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

//hard delete

const deleteUsers = async (req, res) => {
  try {
    let loginUser = req.user;
    let access = hasAccess(requiredRole, loginUser);
    if (!access) {
      return errorHandler(req, res, { message: "invalid" }, 500);
    }
    const id = req.params.id;
    let result = await employee.findByIdAndDelete({ _id: id });
    successHandler(req, res, { Employee: result, message: "deleted" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//soft delete

const inActive = async (req, res) => {
  try {
    let loginUser = req.user;
    let access = hasAccess(requiredRole, loginUser);
    if (!access) {
      return errorHandler(req, res, { message: "invalid" }, 500);
    }
    const id = req.params.id;
    let result = await employee.findByIdAndUpdate(id, {
      $set: { isActive: false },
    });
    successHandler(req, res, { Employee: result, message: "soft deleted" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//update

const updateUser = async (req, res) => {
  try {
    let loginUser = req.user;
    console.log(loginUser)
    let access = hasAccess(requiredRole, loginUser);
    if (!access) {
      return errorHandler(req, res, { message: "invalid" }, 500);
    }
    const id = req.body._id;
    let result = await employee.findByIdAndUpdate({ _id: id }, req.body);
    successHandler(req, res, { data: result, message: "updated user details" });
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//search

const searchUser = async (req, res) => {
  try {
    let loginUser = req.user;
    let access = hasAccess(requiredRole, loginUser);
    if (!access) {
      return errorHandler(req, res, { message: "invalid" }, 500);
    }
    const data = req.body.firstName;
    const data2 = req.body.email;
    const data3 = req.body.email;
    let result = await employee.find(
      {
        $or: [
          { firstName: { $regex: `${data}` } },
          { email: { $regex: `${data2}` } },
          {contactNo: { $in: `${data3}` }},
        ],
      }
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
  joinEmployee,
};
