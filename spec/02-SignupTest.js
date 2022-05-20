const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const agent = request.agent(app);

describe('Use MongoDB database', function() {
  this.timeout(5000);

  const mongoose = require('mongoose');
  const db = mongoose.connection;

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  describe('02. signup test', () => {
    it('should show signup page', (done) => {
      request(app)
      .get('/signup')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.text).include('Password confirm');

        done();
      });
    });

    //회원가입 하는 부분. DB에 데이터를 저장한다. 다음 it에서 삭제를 해줌으로써 DB확인도 하자.
    it('should register user write in correct data', (done) => {
      request(app)
      .post('/signup')
      .send({
        email: "aa@aa.com",
        username: "aa",
        password: "aaaaaaaa",
        password2: "aaaaaaaa",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        console.log(res.body.result)

        done();
      })
    })
  });
});
