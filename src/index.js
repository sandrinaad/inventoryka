const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = 3000;


app.use(express.json());
 
app.get('/', (req, res) => {
    res.send("<h1>Halo Dunia! Server Express pertama saya berjalan!</h1>");
});

const usersRouter = require('./users/users.controller');
app.use('/users', usersRouter);

const roleRouter = require('./role/role.controller');
app.use('/role', roleRouter);

const categoryRouter = require('./category/category.controller');
app.use('/category', categoryRouter);

app.listen(port, () => {
    console.log (`Server berhasil dijalankan di http://localhost:${port}`);
});

