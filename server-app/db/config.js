const util =  require ( 'util' );
var mysql =  require ( 'mysql' );

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
});

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }else 
     console.log("DB connected to my sql");


  if (connection) connection.release()

  return
});

db.query = util.promisify(db.query);
module.exports = db;



