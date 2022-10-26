import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests /login routes', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as User);
  }); 

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Tests if correctly logs in', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
       });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Tests if some field is empty', () => {
    expect(false).to.be.eq(true);
  });
});
