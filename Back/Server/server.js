require('./config/config');
const express = require('express');
const cors = require('cors');
const {createTables, dbConnection} = require('./config/pgconfig');

const app = express();
app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use(require('./routes/index'));

dbConnection();
createTables();

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});