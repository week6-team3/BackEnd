const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const setCorsOptions = require('./middlewares/setCorsHeader');
var fs = require('fs');
const { NONAME } = require('dns');

const app = express();
const PORT = 3030;

const corsOptions = {
  origin: 'https://pickup-week6.vercel.app',
  // credentials: true,
};
app.use(cors(corsOptions));

app.use(setCorsOptions.corsHeader);

app.use([express.json(), express.urlencoded({ extended: false }), cookieParser()]); // body-parser 전역 미들웨어
app.use('/', routes); // 라우터 등록

// app.use(errorLogger); // Error Logger
// app.use(errorHandler); // Error Handler

app.listen(PORT, () => {
  console.log(PORT, '서버를 실행 중 입니다.');
});

module.exports = app;
