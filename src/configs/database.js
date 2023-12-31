const { DB_HOST, DB_USER, DB_PASS, DATABASE } = require("./secrets.js");
const {
  currentDateTime,
  requestStatus,
  toMySqlDateTime,
} = require("./utils.js");

const mysql = require("mysql-promise")();

mysql.configure({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DATABASE,
});

function connection() {
  mysql
    .getConnection()
    .then(() => {
      console.log("Connected to the database.");
      // Perform your database operations here
    })
    .catch((error) => {
      console.error("Failed to connect to the database:", error);
    });
}

function createPasslip(
  first_name,
  last_name,
  middle_name,
  time_out,
  request_type,
  location,
  position,
  phone
) {
  const dateAndTime = currentDateTime();
  return mysql.query(
    "INSERT INTO passlips (first_name, last_name,middle_name ,time_out, request_type ,status, location, position,phone_no, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [
      first_name,
      last_name,
      middle_name,
      toMySqlDateTime(time_out),
      request_type,
      requestStatus.PENDING,
      location,
      position,
      phone,
      dateAndTime,
      dateAndTime,
    ]
  );
}

function getAllPasslip() {
  return mysql.query("SELECT * FROM passlips ORDER BY id DESC");
}

function statusPasslip(status, id) {
  const dateAndTime = currentDateTime();
  if (status === 4) {
    return mysql.query(
      "UPDATE passlips SET status = ?, time_in = ?, updated_at = ? WHERE id = ?",
      [status, dateAndTime, dateAndTime, id]
    );
  }
  return mysql.query(
    "UPDATE passlips SET status = ?, updated_at = ? WHERE id = ?",
    [status, dateAndTime, id]
  );
}

function deletePasslip(id) {
  return mysql.query("DELETE FROM passlips WHERE id = ?", [id]);
}

function getAllSlipsByStatus(id) {
  return mysql.query("SELECT * FROM passlips WHERE status = ?", [id]);
}
// USER
function loginUser(username) {
  return mysql.query("SELECT * FROM users WHERE username = ?", [username]);
}

function createAccount(first_name, last_name, username, password, token) {
  const dateAndTime = currentDateTime();
  return mysql.query(
    "INSERT INTO users (first_name, last_name, username, password, token, created_at, updated_at) VALUES (?,?,?,?,?,?,?)",
    [first_name, last_name, username, password, token, dateAndTime, dateAndTime]
  );
}
module.exports = {
  connection,
  createPasslip,
  getAllPasslip,
  statusPasslip,
  deletePasslip,
  loginUser,
  createAccount,
  getAllSlipsByStatus,
};
