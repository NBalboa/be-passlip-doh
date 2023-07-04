const { Router } = require("express");
const { CONTROLLER } = require("./passlip.controller.js");

const app = Router();

app.get("/", CONTROLLER.allPasslips);
app.post("/add", CONTROLLER.addPasslip);
app.put("/update/:status/:id", CONTROLLER.updatePasslip);
app.delete("/delete/:id", CONTROLLER.deletedPasslip);

module.exports = app;
