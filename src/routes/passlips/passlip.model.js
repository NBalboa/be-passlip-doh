const { Router } = require("express");
const { CONTROLLER } = require("./passlip.controller.js");
const { passlipValidation } = require("../../configs/validators.js");

const app = Router();

app.get("/", CONTROLLER.allPasslips);
app.post("/add", passlipValidation, CONTROLLER.addPasslip);
app.put("/update/:status/:id", CONTROLLER.updatePasslip);
app.delete("/delete/:id", CONTROLLER.deletedPasslip);
app.get("/all/:status", CONTROLLER.statusPasslips);

module.exports = app;
