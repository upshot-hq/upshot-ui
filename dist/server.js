const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../build')));
const port = process.env.PORT || 3000;

// handle all react http requests
app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, '../build/index.html'));
});


app.listen(port);
console.log(`server started ${port}`);
