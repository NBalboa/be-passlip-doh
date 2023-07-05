const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("./secrets");
const moment = require("moment");

const getCurrentDateTime = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};

const requestStatus = {
  PENDING: 1,
  APPROVED: 2,
  CANCELLED: 3,
  COMPLETED: 4,
};

const requestType = {
  PERSONAL: 1,
  OFFICIAL: 2,
};

function getStatus(status) {
  let statusType = parseInt(status);
  let message = null;
  if (statusType === 1) {
    statusType = requestStatus.PENDING;
    message = "Passlip is Pending";
  } else if (statusType === 2) {
    statusType = requestStatus.APPROVED;
    message = "Passlip was approved";
  } else if (statusType === 3) {
    statusType = requestStatus.CANCELLED;
    message = "Passlip was cancelled";
  } else if (statusType === 4) {
    statusType = requestStatus.COMPLETED;
    message = "Passlip was completed";
  } else {
    return null;
  }
  return { statusType, message };
}

function getRequestType(request_type) {
  if (request_type.toLowerCase() === "personal") {
    return requestType.PERSONAL;
  } else if (request_type.toLowerCase() === "official") {
    return requestType.OFFICIAL;
  } else {
    return null;
  }
}

function toMySqlDateTime(datetime) {
  const originalDate = new Date(datetime);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");
  const hour = String(originalDate.getHours()).padStart(2, "0");
  const minute = String(originalDate.getMinutes()).padStart(2, "0");
  const second = String(originalDate.getSeconds()).padStart(2, "0");

  const mysqlDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return mysqlDateTime;
}

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

function unHashPassword(password, hashPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  currentDateTime: getCurrentDateTime,
  requestStatus: requestStatus,
  getStatus: getStatus,
  toMySqlDateTime: toMySqlDateTime,
  hashPassword: hashPassword,
  getRequestType: getRequestType,
  unHashPassword: unHashPassword,
};
