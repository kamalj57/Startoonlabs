const express = require('express')
const cors=require('cors')
const app = express()
require("dotenv").config();

const db=require('./db/db');
const route=require('./routes/routes');

app.use(cors());


app.use(express.json());
app.use(route);

const port = 8000;

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
  db();
});
