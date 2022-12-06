const express = require('express');
const bodyParser = require('body-parser')
const usersRoute = require('./routes/usersRoute')
const artistsRoute = require('./routes/artistsRoute')
const cors = require('cors')

const app = express();
const PORT = 8080;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded());
app.use(cors())

app.use('/user', usersRoute)
app.use('/artist', artistsRoute)

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);