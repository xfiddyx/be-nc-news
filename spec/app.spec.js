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
    it('returns an error a id that does not exist but is valid', () => {
      return request(app)
        .get('/api/articles/76')
        .expect(404)
        .then(res => expect(res.body).to.eql({ msg: 'not found' }));
    });
    it('returns an error a id that is invalid', () => {
      return request(app)
        .get('/api/articles/not_a_number')
        .expect(400)
        .then(res => expect(res.body).to.eql({ msg: 'invalid id' }));
    });
  });
  describe('PATCH api/articles/:article_id', () => {
    it('responds with the updated article after the amount of votes has been increased', () => {
      return request(app)
        .patch('/api/articles/5')
        .send({ inc_votes: 10 })
        .expect(200)
        .then(res =>
          expect(res.body).to.eql({
            updated_article: [
              {
                article_id: 5,
                title: 'UNCOVERED: catspiracy to bring down democracy',
                body: 'Bastet walks amongst us, and the cats are taking arms!',
                votes: 10,
                topic: 'cats',
                author: 'rogersop',
                created_at: '2002-11-19T12:21:54.171Z'
              }
            ]
          })
        );
    });
    it('responds with the updated article after the amount of votes has been decreased', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: -10 })
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({
            updated_article: [
              {
                article_id: 1,
                title: 'Living in the shadow of a great man',
                body: 'I find this existence challenging',
                votes: 90,
                topic: 'mitch',
                author: 'butter_bridge',
                created_at: '2018-11-15T12:21:54.171Z'
              }
            ]
          });
        });
    });
    it('responds with an error when sent a string', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: 'not a number' })
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({
            msg: 'invalid request'
          });
        });
    });
    it('responds with an error when trying to update a key that is not votes', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ update_user: 200 })
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({
            msg: 'invalid request'
          });
        });
    });
  });
  describe('POST /api/articles/:article_id/comments', () => {
    it('successfully posts', () => {
      return request(app)
        .post('/api/articles/1/comments')
        .send({ username: 'butter_bridge', body: 'Posting a comment!' })
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({
            comment: 'Posting a comment!'
          });
        });
    });

    it('returns an error when an invalid id used', () => {
      return request(app)
        .post('/api/articles/74/comments')
        .send({ username: 'butter_bridge', body: 'Posting a comment!' })
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({
            msg: 'invalid request'
          });
        });
    });
    it('returns an error when given an invalid username in the request', () => {
      return request(app)
        .post('/api/articles/74/comments')
        .send({ username: 'not-a-username', body: 'Posting a comment!' })
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({
            msg: 'invalid request'
          });
        });
    });
  });
  describe.only('GET /api/articles/:article_id/comments', () => {
    it('returns a get request for all the comments of a given article sorted by created_at - the default', () => {
      return request(app)
        .get('/api/articles/9/comments')
        .expect(200)
        .then(result =>
          expect(result.body).to.eql([
            {
              comments_id: 1,
              author: 'butter_bridge',
              votes: 16,
              created_at: '2017-11-22T12:36:03.389Z',
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
            },
            {
              comments_id: 17,
              author: 'icellusedkars',
              votes: 20,
              created_at: '2001-11-26T12:36:03.389Z',
              body: 'The owls are not what they seem.'
            }
          ])
        );
    });
    it('returns a sort_by query', () => {
      return request(app)
        .get('/api/articles/9/comments?sort_by=votes')
        .expect(200)
        .then(result =>
          expect(result.body).to.eql([
            {
              comments_id: 17,
              author: 'icellusedkars',
              votes: 20,
              created_at: '2001-11-26T12:36:03.389Z',
              body: 'The owls are not what they seem.'
            },
            {
              comments_id: 1,
              author: 'butter_bridge',
              votes: 16,
              created_at: '2017-11-22T12:36:03.389Z',
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
            }
          ])
        );
    });
    it('returns a sort_by query in ascedning order - multiple queries', () => {
      return request(app)
        .get('/api/articles/9/comments?sort_by=votes&order_by=asc')
        .expect(200)
        .then(result =>
          expect(result.body).to.eql([
            {
              comments_id: 1,
              author: 'butter_bridge',
              votes: 16,
              created_at: '2017-11-22T12:36:03.389Z',
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
            },
            {
              comments_id: 17,
              author: 'icellusedkars',
              votes: 20,
              created_at: '2001-11-26T12:36:03.389Z',
              body: 'The owls are not what they seem.'
            }
          ])
        );
    });
  });
});
