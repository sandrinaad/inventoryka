const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 
const cookieParser = require("cookie-parser");


app.use(cookieParser());
const port = 3000;
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());



app.use(express.json());
 
const authRoutes = require('./auth/auth.routes');
app.use("/auth", authRoutes);

// app.get("/profile", authenticate, (req, res) => {
//   res.json({ message: "Hello " + req.user.email });
// });

const usersRouter = require('./users/users.controller');
app.use('/users', usersRouter);

const roleRouter = require('./role/role.controller');
app.use('/role', roleRouter);

const categoryRouter = require('./category/category.controller');
app.use('/category', categoryRouter);

const locationRouter = require('./location/location.controller');
app.use('/location', locationRouter);

const condiRouter = require('./condi/condi.controller');
app.use('/condi', condiRouter);

const barangRouter =  require('./barang/barang.controller');
app.use('/barang', barangRouter);

const pengajuanRouter = require('./pengajuan/pengajuan.controller');
app.use('/pengajuan', pengajuanRouter);

const pengaduanRouter = require('./pengaduan/pengaduan.controller');
app.use('/pengaduan', pengaduanRouter);

app.listen(port, () => {
    console.log (`Server berhasil dijalankan di http://localhost:${port}`);
});

