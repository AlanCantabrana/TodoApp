require('../config/config');
const {connectionString, isProduction}= require ('./config');
const {Pool} = require('pg');

//database connection
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction,
    
});
//check database connection
const dbConnection = () => {
    pool.query('SELECT NOW()', (err,res) => {
        if (err) throw err;
        console.log('Base de datos ONLINE');
    });
};

//create table users
const createTodoTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS todo(
        todo_id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        title VARCHAR(128) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT FALSE
    )`;

    pool.query(queryText).then((res) => {
    }).catch((err) => {
        console.log(err);
    });
};

const createTables = () => {
    createTodoTable();
}

 module.exports = {createTables,dbConnection, pool};