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

  describe('/api/users', () => {
    it('GET users - returns a request of a usernames details', () => {
      return request(app)
        .get('/api/users/lurker')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({
            user: [
              {
                username: 'lurker',
                avatar_url:
                  'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                name: 'do_nothing'
              }
            ]
          });
        });
    });
    it('GET returns an error when passed an invalid username', () => {
      return request(app)
        .get('/api/users/Not-a-username')
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: 'not found' });
        });
    });
  });
  describe('GET api/articles ', () => {
    it('returns an object with the requested article_id', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(res =>
          expect(res.body).to.eql({
            article: [
              {
                article_id: 1,
                title: 'Living in the shadow of a great man',
                body: 'I find this existence challenging',
                votes: 100,
                topic: 'mitch',
                created_at: '2018-11-15T12:21:54.171Z',
                author: 'butter_bridge'
              }
            ]
          })
        );
    });
    it('returns an error a id that does not exist is passed', () => {
      return request(app)
        .get('/api/articles/76')
        .expect(404)
        .then(res => expect(res.body).to.eql({ msg: 'not found' }));
    });
    it('returns an error a id that does not exist is passed', () => {
      return request(app)
        .get('/api/articles/not_a_number')
        .expect(400)
        .then(res => expect(res.body).to.eql({ msg: 'invalid id' }));
    });
  });
});
