let express = require('express');
//파일 업로드
let formidable = require('formidable');
let db = require('../config/db');
let router = express.Router();
let fs = require('fs');

router.post('/sign_up', function(req, res, next) {

  let id_terminal = req.body.id_terminal;
  let name = req.body.name;
  let sql_count = "SELECT count(*) as cnt FROM member WHERE id_terminal = ? LIMIT 1;";
  let sql_insert = "INSERT INTO member (id_terminal, name, question_ids) VALUES (?, ?, ?);";

  if(!id_terminal) {
    return res.sendStatus(400);
  }

  //db에 값이 있는지 검사
  db.get().query(sql_count, id_terminal, function (err, rows) {
    //없으면 새로 만듦
    if(rows[0].cnt == 0) {
      db.get().query(sql_insert, [id_terminal, name, ""], function (err, result) {
        if (err) {
          return res.sendStatus(400);
        }
        res.status(200).send('' + result.insertId);
      });
    }
    else {
      return res.status(400).send('Already exists');
    }

  });


});


module.exports = router;
