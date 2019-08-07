const express = require('express');
const cors  = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
mongoose.connect('mongodb+srv://sa:root@cluster0-qlbte.mongodb.net/omnistack?retryWrites=true&w=majority', { useNewUrlParser: true });

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);
server.listen(3333);