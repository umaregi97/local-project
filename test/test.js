process.env.NODE_ENV = 'test';

let User = require("../models/user")
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app')

chai.use(chaiHttp);
let should = chai.should();

describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
           done();
        });
    });

    describe('/POST User', () => {
        it('it should not POST a book without Phone number field', (done) => {
          let user = {
              firstName: "sriram",
              lastName: "karthi",
              userName: "srkarthi1996",
              email: "srkarthi1994@gmail.com",
              password: "Welcome@123"
          }
        chai.request(server)
            .post('v1/register')
            .send(user)
            .end((err, res) => {
                console.log("response ",res)
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('phoneNumber');
                  res.body.errors.pages.should.have.property('kind').eql('required');
                 done();
            });
      });
        it('it should  POST a book with all field', (done) => {
          let user = {
              firstName: "sriram",
              lastName: "karthi",
              userName: "srkarthi1996",
              email: "srkarthi1994@gmail.com",
              phoneNumber: 9994929428,
              password: "Welcome@123"
          }
        chai.request(server)
            .post('v1/register')
            .send(user)
            .end((err, res) => {
               console.log("response 2",res)
                res.should.have.status(200);
                res.should.be.a('object');
                res.message.should.have.property('_id');
               done();
            });
      });
    })
    

})