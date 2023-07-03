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
  position
) {
  return mysql.query(
    "INSERT INTO passlips (first_name, last_name,middle_name ,time_out, request_type ,status, location, position, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)",
    [
      first_name,
      last_name,
      middle_name,
      toMySqlDateTime(time_out),
      request_type,
      requestStatus.PENDING,
      location,
      position,
      currentDateTime,
      currentDateTime,
    ]
  );
}

function getAllPasslip() {
  return mysql.query("SELECT * FROM passlips");
}

function statusPasslip(status, id) {
  return mysql.query(
    "UPDATE passlips SET status = ?, updated_at = ? WHERE id = ?",
    [status, currentDateTime, id]
  );
}

function deletePasslip(id) {
  return mysql.query("DELETE FROM passlips WHERE id = ?", [id]);
}

module.exports = {
  connection,
  createPasslip,
  getAllPasslip,
  statusPasslip,
  deletePasslip,
};