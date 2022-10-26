const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var fs = require('fs');

const app = express();
const PORT = 3030;

app.use(cors());


// app.use(cors({
//   origin : 'https://pickup-week6.app',
//   // origin : ['localhost:3000','https://01b3-218-146-51-90.jp.ngrok.io'],
//   credentials : true,
  
// }));
app.use([express.json(),express.urlencoded({ extended: false }),cookieParser(),]); // body-parser 전역 미들웨어

app.use('/', routes); // 라우터 등록

// app.use(errorLogger); // Error Logger
// app.use(errorHandler); // Error Handler


app.listen(PORT, () => {
  console.log(PORT, '서버를 실행 중 입니다.');
});

module.exports = app;