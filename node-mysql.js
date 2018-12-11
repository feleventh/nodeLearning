const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'my_database'
})

connection.query('SELECT * FROM my_table', (error, results, fields) => {
  if (error) throw error

  connection.release()
})