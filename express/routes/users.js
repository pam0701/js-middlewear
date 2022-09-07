// @ts-check

const express = require('express');

const router = express.Router();

module.exports = router;

const USER = [
  {
    id: 'klaus',
    name: 'van',
    email: 'psb04027@naver.com',
  },
  {
    id: 'test',
    name: 'testman',
    email: 'zxc123@daum.net',
  },
];

// localhost:4000/users로 접속 시 수행
router.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('user', { USER, userCounts: userLen });
  /* res.send(USER); */
});

//회원 조회
//const userData = USER.find(function(user, index) -> index 값도 받아올 수 있음
router.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('해당 아이디를 가진 회원이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

//회원 등록
router.post('/', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
    };
    USER.push(newUser);
    res.send('회원 등록 완료');
  } else {
    const err = new Error('해당 아이디를 가진 회원이 없습니다.');
    err.statusCode = 404;
    throw err;
    res.end('잘못된 쿼리입니다.');
  }
});

//회원 수정
router.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const userData = USER.find((user) => user.id === req.params.id);
    if (userData) {
      const arrIndex = USER.findIndex((user) => user.id === req.params.id);
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[arrIndex] = modifyUser;
      res.send('회원 수정 완료');
    } else {
      const err = new Error('해당 아이디를 가진 회원이 없습니다.');
      err.statusCode = 404;
      throw err;
      res.end('해당 ID를 가진 회원이 없습니다.');
    }
  } else {
    res.end('부적절한 쿼리입니다.');
  }
});

//회원 삭제
router.delete('/:id', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    const err = new Error('해당 아이디를 가진 회원이 없습니다.');
    err.statusCode = 404;
    throw err;
    res.end('해당 ID를 가진 회원이 없습니다.');
  }
});