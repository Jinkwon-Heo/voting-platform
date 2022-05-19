const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const agent = request.agent(app);

describe("Use MongoDB database", function() {
  this.timeout(5000);

  const mongoose = require("mongoose");
  const db = mongoose.connection;

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  describe("01. Login test", () => {
    it("should show login page", (done) => {
      request(app)
      .get("/login")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Look Around");

        done();
      });
    });

    it("should not logged in if user put not exists username", (done) => {
      request(app)
      .post("/login")
      .send({
        username: "ccc",
        password: "ccccc",
      })
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.redirect).to.true;

        request(app)
        .get("/login")
        .end((err, res) => {
          if (err) return done(err);

          expect(res.text).to.include("로그인페이지");

          done();
        });
      });
    });

    it("should not logged in if user put wrong password", (done) => {
      request(app)
      .post("/login/local")
      .send({
        username: "this is wrong username",
        password: "this is wrong password",
      })
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.redirect).to.true;

        request(app)
        .get("/login")
        .end((err, res) => {
          if (err) return done(err);

          expect(res.text).to.include("로그인페이지");

          done();
        });
      });
    });

    it("should logged in if user put valid username and password", (done) => {
      agent
      .post("/login/local")
      .send({
        username: "xx",
        password: "xxxxx",
      })
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);

        expect("set-cookie").to.exist;
        expect(res.text).include("/");

        agent
        .get("/")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.text).include("코딩 전쟁이 일어난다.");
          expect(res.text).include("로그아웃");

          done();
        });
      });
    });
  });
});
