const express = require('express');
const routes = require('./routes');
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/error-hander.middleware');
const app = express();
const PORT = 3016;

app.use(express.json()); // body-parser 전역 미들웨어
app.use('/api', routes); // 라우터 등록
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

app.listen(PORT, () => {
  console.log(PORT, '서버를 실행 중 입니다.');
});

module.exports = app;
