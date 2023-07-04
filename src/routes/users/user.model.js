const { Router } = require("express");
const app = Router();
const jwt = require("jsonwebtoken");
const { login } = require("../../configs/database.js");
const { unHashPassword } = require("../../configs/utils.js");
const { ACCESS_TOKEN } = require("../../configs/secrets.js");

const { CONTROLLER } = require("./user.controller.js");

app.post("/register", CONTROLLER.REGISTER);
app.post("/login", CONTROLLER.LOGIN);

async function authenticatePassword(req, res, next) {
  const { username, password } = req.body;

  try {
    const get_user = await login(username);
    const user_details = get_user[0][0];
    const checkPassword = await unHashPassword(password, user_details.password);
    if (!checkPassword) {
      res.json({ msg: "Invalid Password", success: false });
      return;
    }
    req.user_details = user_details;
    jwt.verify(user_details.token, ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.json({ msg: "Invalid Token", success: false });
        return;
      }
    });
    // console.log(checkPassword);
  } catch (e) {
    console.log(e);
  }

  next();
  //   jwt.verify();
}
module.exports = app;
