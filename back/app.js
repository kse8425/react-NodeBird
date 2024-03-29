const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');
const path = require('path')
const hpp = require('hpp');
const helmet = require('helmet');
const { createAgent } = require('@forestadmin/agent');
const { createSequelizeDataSource } = require('@forestadmin/datasource-sequelize');
const sequelizeInstance = require('./models');



dotenv.config();
const app = express();

createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === 'production',

})
  .addDataSource(createSequelizeDataSource(db.sequelize))
  .mountOnExpress(app)
  .start();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공!!')
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy',1);
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(cors({
    origin: ['https://front.ofabrica.com'],
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  proxy: process.env.NODE_ENV === 'production',
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.NODE_ENV === 'production' && '.ofabrica.com'
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter)
app.use('/hashtag', hashtagRouter);



app.listen(3065, () => {
  console.log('서버 실행 중')
})