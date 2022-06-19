const employee = require("../models/empSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
var generator = require("generate-password");
const sendMail = require("../mailer/sendMail");
const { errorHandler, successHandler } = require("./../helper/handlers");
require("dotenv").config();

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(422).send({
        message: "Missing email or password",
      });
    }
    const emp = await employee.findOne({ email: email });
    if (!emp) {
      return res.status(422).send({
        message: "Email does not found",
      });
    }
    const match = await bcrypt.compare(password, emp.password);
    if (match) {
      // const token = jwt.sign({...emp},process.env.USER_VERIFICATION_TOKEN_SECRET)
      const token = jwt.sign(
        { email: email, roleName: emp.roleName },
        process.env.USER_VERIFICATION_TOKEN_SECRET
      );

      // res.send("logged in")
      // res.send(token)
      successHandler(req, res, { Token: token, message: "login successfully" });
    } else {
      return res.status(422).send({
        message: "wrong password",
      });
    }
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//forget
const forget = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt_decode(token);
    const { email } = req.body;
    if (!email) {
      return res.status(422).send({
        message: "Missing email",
      });
    } else if (email == decoded.email) {
      const pwd = generator.generate({
        length: 8,
        numbers: true,
        unique: true,
      });
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(pwd, salt);
      const forgetpassword = await employee.updateOne(
        { email: email },
        { password: encryptedPassword },
        req.body
      );
      sendMail.sendMail(email, pwd);
      // errorHandler(req, res, {message:"unauthorized email"}, 403);
      successHandler(req, res, {
        data: forgetpassword,
        message: "forget password change",
      });
    } else {
      return res.status(422).send({
        success: "false",
        message: " Email Does not Match",
      });
    }
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

//change password
const change = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt_decode(token);
    const Employee = new employee();
    const { password, email } = req.body;
    if (!email) {
      return res.status(422).send({
        message: "Missing email or password",
      });
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      let result = await employee.updateMany(
        { email: email },
        { password: encryptedPassword },
        req.body
      );
      successHandler(req, res, { data: result, message: "password change" });
    } else {
      return res.status(422).send({
        success: "false",
        message: " Email Does not Match",
      });
    }
  } catch (err) {
    errorHandler(req, res, err, 500);
  }
};

module.exports = { login, forget, change };
