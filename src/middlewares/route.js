const PASSLIP = require("../routes/passlips/passlip.model");
const USER = require("../routes/users/user.model");

const router = (app) => {
  app.use("/request", PASSLIP);
  app.use("/user", USER);
};

module.exports = {
  router,
};
