const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use([express.json(), express.urlencoded({ extended: false }), cookieParser()]); // body-parser 전역 미들웨어
app.use('/', routes); // 라우터 등록

app.listen(PORT, () => {
  console.log(PORT, '서버를 실행 중 입니다.');
});

module.exports = app;
