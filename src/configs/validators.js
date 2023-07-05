const Validator = require("validatorjs");

const validator = async (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const register = async (req, res, next) => {
  const validationRules = {
    first_name: "required|string",
    last_name: "required|string",
    username: "required|string",
    password: "required|string",
    confirm_pass: "required|string|confirmed:password",
  };
  const customError = {
    "required.confirm_pass": "The confirm password field is required.",
    "confirmed.confirm_pass": "The password doesn't match",
  };
  await validator(req.body, validationRules, customError, (err, status) => {
    if (!status) {
      res.json({ result: err, success: false });
    } else {
      next();
    }
  });
};

const login = async (req, res, next) => {
  const validationRules = {
    username: "required|string",
    password: "required|string",
  };

  await validator(req.body, validationRules, {}, (err, status) => {
    if (!status) {
      res.json({ result: err, success: false });
    } else {
      next();
    }
  });
};

const passlip = async (req, res, next) => {
  const validationRules = {
    first_name: "required|string",
    last_name: "required|string",
    time_out: "required|string",
    request_type: "required|string",
    position: "required|string",
    location: "required|string",
    phone_no: "required|string",
  };

  await validator(req.body, validationRules, {}, (err, status) => {
    if (!status) {
      res.json({ result: err, success: false });
    } else {
      next();
    }
  });
};

module.exports = {
  registerValidation: register,
  loginValidation: login,
  passlipValidation: passlip,
};
