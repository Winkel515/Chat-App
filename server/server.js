const path = require('path'); // Built it module. Don't need npm i path
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

// console.log(__dirname + '/../public');

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log(`Server up on port ${port}`)
})