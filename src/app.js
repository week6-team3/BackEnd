const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3030;
const winston = require('winston');
const logger = require('./config/winston');
global.logger || (global.logger = require('./config/winston')); // → 윈스턴 로거를 전역에서 사용
const morganMiddleware = require('./middlewares/morganMiddleware');

// const {
//   errorHandler,
//   errorLogger,
// } = require('./middlewares/error-hander.middleware');

// 나중에 프론트에서 배포된 주소로 whitelist 추가할 것
let corsOptions = {
  // origin: 'https://pickup-week6.vercel.app/'
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morganMiddleware);
app.use([express.json(), express.urlencoded({ extended: false }), cookieParser()]); // body-parser 전역 미들웨어

app.use('/', routes); // 라우터 등록

// app.use(errorLogger); // Error Logger
// app.use(errorHandler); // Error Handler

app.listen(PORT, () => {
  console.log(PORT, '서버를 실행 중 입니다.');
});

module.exports = app;
