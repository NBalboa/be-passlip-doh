const getCurrentDateTime = new Date()
  .toISOString()
  .slice(0, 19)
  .replace("T", " ");

const requestStatus = {
  PENDING: 1,
  APPROVED: 2,
  CANCELLED: 3,
  COMPLETED: 4,
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

module.exports = {
  currentDateTime: getCurrentDateTime,
  requestStatus: requestStatus,
  getStatus: getStatus,
};
