const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 9000;
const upload = require('./routers/upload');
const bodyParser = require('body-parser');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/images'));
app.set('view engine', 'ejs');
app.use('/upload', upload);

app.listen(port, function () {
    console.log('server is running on PORT', port)
})
