const express = require('express');
const bodyParser = require('body-parser')
const studentsRoute = require('./routes/students')
const adminRoute = require('./routes/admin')
const cors = require('cors')
const passport = require('passport');

const app = express();
const PORT = 8080;

// Replace the uri string with your connection string.


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(passport.initialize());

app.use('/student', studentsRoute)

app.use('/admin', adminRoute)

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);