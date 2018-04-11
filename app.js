let express = require('express');
let path = require('path');
let http = require('http');
let app = express();
//body 데이터 접근
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');


let db = require('./config/db');
db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  }
});

//정적파일 로드
// app.use(express.static('public/img/member/profile'));
// app.use(express.static('public/img/question/main'));
// app.use(express.static('public/img/question/multiple'));
// app.use(express.static('public/img/answer'));



//bodyParser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//외부모듈 (라우터) 실행
app.use('/member', require('./routes/member'));


if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

/*
//테스트용 서버 실행
let server = http.createServer(app);
server.listen(52273, function() {
  console.log('server running');
});*/


module.exports = app;
