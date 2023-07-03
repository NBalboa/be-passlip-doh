const {
  getAllPasslip,
  createPasslip,
  statusPasslip,
} = require("../../configs/database");
const { getStatus, getRequestType } = require("../../configs/utils");

CONTROLLER = {
  allPasslips: (req, res) => {
    getAllPasslip()
      .spread((result) => {
        res.json({ data: result, succes: true });
      })
      .catch((err) => {
        res.json({ data: "err", succes: false });
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
    } = req.body;
    const REQUEST_TYPE = getRequestType(request_type);
    console.log(REQUEST_TYPE);
    if (REQUEST_TYPE == null) {
      res.json({ msg: "Request type is required", succes: false });
      return;
    } else {
      createPasslip(
        first_name,
        last_name,
        middle_name,
        time_out,
        REQUEST_TYPE,
        position,
        location
      )
        .then((result) => {
          res.json({ msg: "Request was created", succes: true });
        })
        .catch((err) => {
          console.log(err);
          res.json({ msg: "fail", succes: false });
        });
    }
  },
  updatePasslip: (req, res) => {
    const { status, id } = req.params;
    let passlipStatus = getStatus(status);
    if (passlipStatus == null) {
      res.json({ msg: "Status type is require", succes: false });
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
};

module.exports = {
  CONTROLLER,
};
