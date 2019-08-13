const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
mongoose.connect('mongodb+srv://sa:root@cluster0-qlbte.mongodb.net/omnistack?retryWrites=true&w=majority', { useNewUrlParser: true });

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    console.log(user, socket.id);
    connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(3333);