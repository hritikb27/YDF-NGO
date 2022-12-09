const express = require('express');
const bodyParser = require('body-parser')
const studentsRoute = require('./routes/students')
const cors = require('cors')

const app = express();
const PORT = 8080;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/student', studentsRoute)

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);