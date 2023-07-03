const {
  getAllPasslip,
  createPasslip,
  statusPasslip,
  deletePasslip,
} = require("../../configs/database");
const { getStatus, getRequestType } = require("../../configs/utils");

CONTROLLER = {
  allPasslips: (req, res) => {
    getAllPasslip()
      .spread((result) => {
        res.json({ data: result, success: true });
      })
      .catch((err) => {
        res.json({ data: "fail to get data", success: false });
      });
  },
  addPasslip: (req, res) => {
    const {
      first_name,
      last_name,
      middle_name,
      time_out,
      request_type,
      position,
      location,
      phone_no,
    } = req.body;
    const REQUEST_TYPE = getRequestType(request_type);
    if (REQUEST_TYPE == null) {
      res.json({ msg: "Request type is required", success: false });
      return;
    } else {
      createPasslip(
        first_name,
        last_name,
        middle_name,
        time_out,
        REQUEST_TYPE,
        position,
        location,
        phone_no
      )
        .then((result) => {
          res.json({ msg: "Request was created", success: true });
        })
        .catch((err) => {
          console.log(err);
          res.json({ msg: "fail", success: false });
        });
    }
  },
  updatePasslip: (req, res) => {
    const { status, id } = req.params;
    let passlipStatus = getStatus(status);
    if (passlipStatus == null) {
      res.json({ msg: "Status type is require", success: false });
      return;
    } else {
      statusPasslip(passlipStatus.statusType, id)
        .then((result) => {
          res.json({ msg: passlipStatus.message, success: true });
        })
        .catch((err) => {
          res.json({ msg: "Failed to approve passlip", success: false });
        });
    }
  },
  deletedPasslip: (req, res) => {
    const { id } = req.params;
    deletePasslip(id)
      .then((result) => {
        res.json({ msg: "Passlip was deleted successfully", succes: true });
      })
      .catch((err) => {
        res.json({ msg: "Fail to delete passlip", success: true });
      });
  },
};

module.exports = {
  CONTROLLER,
};
