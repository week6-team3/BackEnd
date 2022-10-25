const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// const {
//   errorHandler,
//   errorLogger,
// } = require('./middlewares/error-hander.middleware');

const app = express();
const PORT = 3000;

// 나중에 프론트에서 배포된 주소로 whitelist 추가할 것
app.use(cors({ origin: '*' }));
app.use([express.json(), express.urlencoded({ extended: false }), cookieParser()]); // body-parser 전역 미들웨어
app.use('/', routes); // 라우터 등록
// app.use(errorLogger); // Error Logger
// app.use(errorHandler); // Error Handler

app.listen(PORT, () => {
  console.log(PORT, '서버를 실행 중 입니다.');
});

module.exports = app;
