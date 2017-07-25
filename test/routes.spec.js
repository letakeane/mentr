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

chai.use(chaiHttp);


describe('before and before each', () => {

  before(done => {
    database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done();
        });
    });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => {
        done();
      });
  });

  describe('sad path', () =>{

    it('/api/v1/sadthings should not work', (done) => {
      chai.request(server)
      .get('/api/v1/sadthings')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    })

  });

});