const express = require('express');
require('@prisma/client');
const app = express();
const cors = require('cors');
require('dotenv').config();
const route = require('./routes');
const bodyParser = require('body-parser');

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', route);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})