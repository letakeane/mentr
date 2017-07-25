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

describe('top level befores', () => {

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

  });

});






















// process.env.NODE_ENV = 'test';

// const express = require('express');
// const bodyParser = require('body-parser');
// const knex = require('knex');
// const app = express();
// const environment = 'test';
// const configuration = require('../knexfile')[environment];
// const database = require('knex')(configuration);
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../server');
// const should = chai.should();

// chai.use(chaiHttp);

// function myFunction() {
//     setTimeout(function(){ console.log('****&&&***'); }, 2000);
//     console.log('first maybe**')
// }
// myFunction()

//   before((done) => {
//     database.migrate.latest()
//       .then(() => {
//         return database.seed.run()
//         .then(() => {
//           console.log('before')
//           done();
//         });
//     });
//   });
// describe('top level block', () => {


//   beforeEach((done) => {
//     database.seed.run()
//       .then(() => {
//         console.log('before each')
//         done();
//       });
//   });

//   describe('sad path', () =>{

//     it('/api/v1/sadthings should not work', (done) => {
//       chai.request(server)
//       .get('/api/v1/sadthings')
//       .end((err, response) => {
//         response.should.have.status(404);
//         done();
//       });
//     })

//   });

//   describe('program routes', () => {

//     it('/api/v1/sadhings should not work', (done) => {
//       chai.request(server)
//       .get('/api/v1/sadthings')
//       .end((err, response) => {
//         response.should.have.status(404);
//         done();
//       });
//     })

//     it('should get all programs', (done) => {
//       true.should.equal(false);
//       console.log('hitting the test')
//       chai.request(server)
//       .get('/api/v1/programs')
//       .end((err, response) => {
//         console.log(response.body, 'res body')
//         response.should.have.status(900);
//         // response.should.be.json;
//         // response.body[0].should.be.a('object');
//         // response.body.length.should.equal(5);
//       });
//         done();
//     })
//   })


// });