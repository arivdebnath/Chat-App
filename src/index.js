const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000
const pathDir = path.join(__dirname, '../public');

app.use(express.static(pathDir));

app.get('/', (req, res)=>{
    res.render('index');
})

app.listen(port, ()=>{
    console.log(`The server is up and running at ${port}`);
})