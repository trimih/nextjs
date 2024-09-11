const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
// const bodyParser = require('body-parser');
const danhmucRouter = require('./router/danhmucRouter');
const sanphamRouter = require('./router/sanphamRouter');
const userRouter = require('./router/userRouter');
const mailRouter = require('./router/mail');
const app = express();
const port = 3000;
const url = "mongodb://localhost:27017/wd18320";

mongoose.connect(url);

// app.get('/', (req, res) => {
//     res.send('xin chao');
// });
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Sử dụng secure: true khi triển khai trên HTTPS
  }));
app.use(express.static('public'));
app.use('/img', express.static(__dirname+'public/img'))
app.use(danhmucRouter);
app.use(sanphamRouter);
app.use(userRouter);
// app.use(mailRouter);


// app.use((req, res, next) => {
//     if (!req.session.donhangs) {
//         req.session.donhangs = [];
//     }
//     console.log('Session donhangs:', req.session.donhangs);
//     next();
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

