require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());


app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//app.use(require('./routes/loginRoutes'));
require('./routes/allRoutes')(app);

// server.listen(process.env.PORT || 3333, () => {
//     console.log('Server rodando');
// });

module.exports = server;