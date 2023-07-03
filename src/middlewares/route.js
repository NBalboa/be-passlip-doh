const PASSLIP = require("../routes/passlips/passlip.model");

const router = (app) => {
  app.use("/request", PASSLIP);
};

module.exports = {
  router,
};
