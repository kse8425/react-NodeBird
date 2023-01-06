const express = require('express');
const cors = require('cors')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const dotenv = require('dotenv')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const db = require('./models')
const passportConfig = require('./passport');

dotenv.config()
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공!!')
  })
  .catch(console.error);
passportConfig();
app.use(cors({
  origin:'*',
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express')
})
app.get('/api', (req, res) => {
  res.send('hello api')
})
app.get('/api/posts', (req, res) => {
  res.json([
    {id: 1, content:'hello'},
    {id: 2, content:'hello2'},
    {id: 3, content:'hello3'},
  ])
})
app.use('/post',postRouter);
app.use('/user',userRouter)
app.listen(3030, () => {
  console.log('서버 실행 중')
})