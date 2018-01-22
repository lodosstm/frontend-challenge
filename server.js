const path = require('path');
const express = require('express');

const app = express();
const indexPath = path.join(__dirname, '/index.html');
const publicPath = express.static(path.join(__dirname, '/dist'));

app.use('/', publicPath);
app.get('*', function (_, response) {
    response.sendFile(indexPath)
});

const port = (process.env.PORT || 8080);
app.listen(port);
console.log(`Listening at http://localhost:${port}`);