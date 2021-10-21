const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);
// const server = chai.request('http://localhost:3000/api/v1/user')

describe('User', ()=>{
    describe('GET /user/:userId', ()=>{
        it('It should return a list of users', (done)=>{
            // server.get('/')
            // .end((err, res)=>{
            //     if(err) {
            //         done(err)
            //     }
            //     res.should.have.status(200);
            //     res.should.be.a('object');
            //     res.body.should.be.a('object');
            //     res.body.responseText.should.equal('Success')
            //     res.body.responseCode.should.equal(1)
            //     res.body.payload.should.be.a('object')
            //     res.body.payload.should.have.a.property('count')
            //     res.body.payload.should.have.a.property('results')
                
                // done();
            // })
            done();
        })
    })   
})





