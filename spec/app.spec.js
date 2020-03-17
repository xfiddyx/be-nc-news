process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const connection = require('../connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api/topics', () => {
    it('GET topics - return all topics from test database', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics[0]).to.have.all.keys(['slug', 'description']);
          expect(res.body.topics.length).to.equal(3);
        });
    });
  });
});
