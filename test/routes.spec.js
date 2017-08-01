process.env.NODE_ENV = 'test';

const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const app = express();
const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const { testMentorComplete, testMentorPatch } = require('./testData/testMentor.js');
const { testStudentComplete, testStudentPatch } = require('./testData/testStudent.js');

chai.use(chaiHttp);

describe('top level befores', () => {

  before(done => {
    database.migrate.latest()
      .then(() => {
        database.seed.run()
          .then(() => {
            done();
          });
      });
    // done();
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => {
        done();
      });
  });

  describe('base sad path', () => {

    it('/api/v1/sadthings should not work', (done) => {
      chai.request(server)
        .get('/api/v1/sadthings')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

  });

  describe('program routes', (done) => {

    it('should get the programs', (done) => {
      chai.request(server)
        .get('/api/v1/programs')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body.length.should.equal(8);
          done();
        });
    });

    it('should get a specific program', (done) => {
      chai.request(server)
        .get('/api/v1/programs/1')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body.length.should.equal(1);
          done();
        });
    });

    it('should not get a program that does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/programs/100')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

  });

  describe('mentor routes', (done) => {

    it('should get the mentors', (done) => {
      chai.request(server)
        .get('/api/v1/mentors')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body.length.should.equal(3);
          done();
        });
    });

    it('should get a specific mentor', (done) => {
      chai.request(server)
        .get('/api/v1/mentors/17582916')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body.length.should.equal(1);
          done();
        });
    });

    it('should not get a mentor that does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/mentors/10000000')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it('should post a mentor', (done) => {
      chai.request(server)
        .post('/api/v1/mentors')
        .send(testMentorComplete)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.id.should.equal(4)
          done();
        });
    });


    it('should delete a mentor', (done) => {
      chai.request(server)
        .delete('/api/v1/mentors/17582916')
        .send()
        .end((error, response) => {
          response.should.have.status(204);

          chai.request(server)
            .get('/api/v1/mentors')
            .end((err, response) => {

              response.body.length.should.equal(2);
            })
          done();
        });
    });

    it('should not delete a mentor that does not exist', (done) => {
      chai.request(server)
        .delete('/api/v1/mentors/999999999')
        .send()
        .end((error, response) => {

          response.should.have.status(404);

          chai.request(server)
            .get('/api/v1/mentors')
            .end((err, response) => {

              response.body.length.should.equal(3);
            })
          done();
        });
    });

    it('should edit a mentor', (done) => {
      chai.request(server)
        .patch('/api/v1/mentors/1')
        .send(testMentorPatch)
        .end((err, response) => {

          response.should.have.status(201);

          chai.request(server)
            .get('/api/v1/mentors/17582916')
            .end((err, response) => {

              response.should.have.status(200);
              response.should.be.json;
              response.body[0].should.be.a('object');
              response.body[0].preferred_contact.should.equal('slack');
              done();
            });
        });
    });
  });
});

  describe('student routes', (done) => {

    it('should get the students', (done) => {
      chai.request(server)
        .get('/api/v1/students')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body.length.should.equal(1);
          done();
        });
    });

    it('should get a specific student', (done) => {
      chai.request(server)
        .get('/api/v1/students/22563791')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body.length.should.equal(1);
          done();
        });
    });

    it('should not get a student that does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/students/10000000')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it('should post a student', (done) => {
      chai.request(server)
        .post('/api/v1/students')
        .send(testStudentComplete)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.id.should.equal(4)
          done();
        });
    });

    it('should delete a student', (done) => {
      chai.request(server)
        .delete('/api/v1/students/22563791')
        .send()
        .end((error, response) => {
          response.should.have.status(204);

          chai.request(server)
            .get('/api/v1/students')
            .end((err, response) => {

              response.body.length.should.equal(0);
            })
          done();
        });
    });

    it('should edit a student', (done) => {
      chai.request(server)
        .patch('/api/v1/students/22563791')
        .send(testStudentPatch)
        .end((err, response) => {

          response.should.have.status(201);

          chai.request(server)
            .get('/api/v1/students/22563791')
            .end((err, response) => {

              response.should.have.status(200);
              response.should.be.json;
              response.body[0].should.be.a('object');
              response.body[0].preferred_name.should.equal('Leta Keane');
              done();
            });
        });
        });
    
    });
  });
});
