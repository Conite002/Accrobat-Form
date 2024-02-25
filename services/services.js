const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gestion',
  port: 3306
});

connection.connect();

const getAllData = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM commande', (error, results) => {
      if (error) {
        reject(error);
      } else {
        console.log(results.length);
        resolve(results);
        // results.json(results);
      }
    });
  });
};

const addData = (newData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO your_table SET ?', newData, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({ id: result.insertId, ...newData });
      }
    });
  });
};

const updateData = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE your_table SET ? WHERE id = ?', [updatedData, id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ id, ...updatedData });
      }
    });
  });
};

const deleteData = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM your_table WHERE id = ?', id, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getAllData,
  addData,
  updateData,
  deleteData
};
