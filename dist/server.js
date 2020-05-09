const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../build')));
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server started ${port}`);
