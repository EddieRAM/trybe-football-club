import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Users from '../database/models/User';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockedUser = {
  id: 1,
  username: 'User',
  role: 'user',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  email: 'user@user.com'
};

const mockedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidXNlciIsImlhdCI6MTY1MzQ4MDU3OCwiZXhwIjoxNjU0Nzc2NTc4fQ.g9vovVfBIa2WjsPJdqxjbxODdfUyFH1tFds-wSSPDdA'

let stubedUser: sinon.SinonStub;

describe('Tests login route', () => {
  beforeEach(function() {
    stubedUser = sinon.stub(Users, 'findOne');
  });
  afterEach(() => {
    stubedUser.restore();
  })
  it('returns status 400, when user data is incomplete', async () => {
    stubedUser.resolves(undefined);
    const chaiHttpResponse = await chai.request(app).post('/login')
    .send({ password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO' })

    expect(chaiHttpResponse).to.have.status(401);
  })

  it('returns status 400, when user data is invalid', async () => {
    stubedUser.resolves(undefined);
    const chaiHttpResponse = await chai.request(app).post('/login')
    .send({ email: 'user@user.com', password: 'outra_senha_sem_ser_a_do_user' })

    expect(chaiHttpResponse).to.have.status(401);
  })


  it('returns token and status 200, when user data is validated', async () => {
    stubedUser.resolves(mockedUser as any);
    const chaiHttpResponse = await chai.request(app).post('/login')
    .send({ email: 'user@user.com', password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO' })

    const { user: { username }, token } = chaiHttpResponse.body;
    const body = chaiHttpResponse.body; 

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(token).not.to.be.undefined;
    expect(body).to.have.property('email').to.be.equal('user@user.com');
    expect(username).to.be.equal('User');
  })
 
  it('returns user role', async () => {
    stubedUser.resolves(mockedUser as any);

    const chaiHttpGETResponse = await chai.request(app).get('/login/validate').set('authorization', mockedToken)

    const {role} = chaiHttpGETResponse.body;    

    expect(chaiHttpGETResponse.status).to.be.equal(200);    
    expect(role).to.be.equal('user');
  })
  
});
