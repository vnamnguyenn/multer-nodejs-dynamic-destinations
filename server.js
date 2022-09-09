const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 9000;
const upload = require('./routers/upload');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/upload', upload);

app.listen(port, function () {
    console.log('server is running on PORT', port)
})
