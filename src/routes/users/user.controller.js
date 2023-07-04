const { hashPassword, unHashPassword } = require("../../configs/utils.js");
const { createAccount, login } = require("../../configs/database.js");
const { ACCESS_TOKEN } = require("../../configs/secrets.js");
const jwt = require("jsonwebtoken");

const CONTROLLER = {
  REGISTER: async (req, res) => {
    const { first_name, last_name, username, password, confirm_pass } =
      req.body;
    let hashedPassword;
    if (password === confirm_pass) {
      hashedPassword = await hashPassword(password);
    }
    const token = jwt.sign(username, ACCESS_TOKEN);
    try {
      const result = await createAccount(
        first_name,
        last_name,
        username,
        hashedPassword,
        token
      );
      if (result) {
        res.json({ msg: "Successfully created an acccount", success: true });
      }
    } catch (e) {
      //   console.log(e.sqlMessage);
      res.json({
        msg: `Failed to create an account ERROR: ${e.sqlMessage}`,
        success: false,
      });
    }
  },
  LOGIN: async (req, res) => {
    const { username, password } = req.body;

    try {
      const get_user = await login(username);
      const user_details = get_user[0][0];
      const checkPassword = await unHashPassword(
        password,
        user_details.password
      );
      if (!checkPassword) {
        res.json({ msg: "Invalid Password", success: false });
        return;
      }
      const result = {
        first_name: user_details.first_name,
        last_name: user_details.last_name,
        username: user_details.username,
        access_token: user_details.token,
      };

      res.json({ result: result, success: true });
    } catch (e) {
      console.log(e);
      res.json({ msg: "Invalid Password", success: false });
    }
  },
};

module.exports = { CONTROLLER };
