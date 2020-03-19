process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiSorted = require('chai-sorted');
chai.use(chaiSorted);

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
    it('throws a 405 error when the method cannot be found', () => {
      return request(app)
        .patch('/api/topics')
        .send({ invalid: 'method request' })
        .expect(405)
        .then(res => {
          expect(res.body).to.eql({ msg: 'method not found' });
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
        .then(res => expect(res.body).to.eql({ msg: 'invalid request' }));
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
  describe('GET /api/articles/:article_id/comments', () => {
    it('returns a get request for all the comments of a given article sorted by created_at - the default', () => {
      return request(app)
        .get('/api/articles/9/comments')
        .expect(200)
        .then(result => {
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
          ]),
            expect(result.body).to.be.sortedBy('created_at', {
              descending: true
            });
        });
    });
    it('returns a sort_by query', () => {
      return request(app)
        .get('/api/articles/9/comments?sort_by=votes')
        .expect(200)
        .then(result => {
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
          ]),
            expect(result.body).to.be.sortedBy('votes', { descending: true });
        });
    });
    it('returns a sort_by query in ascending order - multiple queries', () => {
      return request(app)
        .get('/api/articles/9/comments?sort_by=votes&order_by=asc')
        .expect(200)
        .then(result => {
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
          ]),
            expect(result.body).to.be.sortedBy('votes', { ascending: true });
        });
    });
    it('returns an error when the column does not exist', () => {
      return request(app)
        .get('/api/articles/9/comments?sort_by=invalid_column')
        .expect(400)
        .then(result => {
          expect(result.body).to.eql({ msg: 'invalid request' });
        });
    });
  });
  describe('GET /api/articles', () => {
    it('returns an articles array of objects with all articles', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(result => {
          expect(result.body.articles[0]).to.have.all.keys([
            'author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'votes',
            'comments_count'
          ]);
          expect(result.body.articles).to.be.sortedBy('created_at', {
            descending: true
          });
        });
    });
    it('returns an articles array of objects with all articles with a sort_by query', () => {
      return request(app)
        .get('/api/articles?sort_by=votes')
        .expect(200)
        .then(result => {
          expect(result.body.articles).to.be.sortedBy('votes', {
            descending: true
          });
          expect(result.body.articles[0].votes).to.equal(100);
        });
    });
    it('returns an articles array of objects with all articles with a sort_by query AND a order_by query', () => {
      return request(app)
        .get('/api/articles?sort_by=article_id&order_by=asc')
        .expect(200)
        .then(result => {
          expect(result.body.articles).to.be.sortedBy('article_id', {
            ascending: true
          });
          expect(result.body.articles[0].article_id).to.equal(1);
        });
    });
    it('returns an articles array of objects with all articles filtered by USERNAME in query', () => {
      return request(app)
        .get('/api/articles?author=rogersop')
        .expect(200)
        .then(result => {
          expect(result.body.articles.length).to.equal(3);
          expect(result.body.articles[0].title).to.equal('Student SUES Mitch!');
        });
    });
    it('returns an articles array of objects with all articles filtered by TOPIC in query', () => {
      return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then(result => {
          expect(result.body.articles.length).to.equal(1);
          expect(result.body.articles[0].title).to.equal(
            'UNCOVERED: catspiracy to bring down democracy'
          );
        });
    });
    it('returns an empty array when the topic is valid but there is no data', () => {
      return request(app)
        .get('/api/articles?topic=paper')
        .expect(200)
        .then(result => {
          expect(result.body.articles.length).to.equal(0);
        });
    });
    it('returns an error when sorting by invalid column ', () => {
      return request(app)
        .get('/api/articles?sort_by=not_a_column')
        .expect(400)
        .then(result => {
          expect(result.body).to.eql({ msg: 'invalid request' });
        });
    });
  });
  describe('PATCH /api/comments/:comment_id', () => {
    it('returns an updated comment with vote count increased by 1', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: 1 })
        .expect(200)
        .then(result =>
          expect(result.body).to.eql({
            comment: [
              {
                comments_id: 1,
                author: 'butter_bridge',
                votes: 17,
                created_at: '2017-11-22T12:36:03.389Z',
                article_id: 9,
                body:
                  "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
              }
            ]
          })
        );
    });
    it('returns an updated comment with vote count decreased by 5', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: -5 })
        .expect(200)
        .then(result =>
          expect(result.body).to.eql({
            comment: [
              {
                comments_id: 1,
                author: 'butter_bridge',
                votes: 11,
                created_at: '2017-11-22T12:36:03.389Z',
                article_id: 9,
                body:
                  "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
              }
            ]
          })
        );
    });
    it('returns an error when the comments_id does not exist', () => {
      return request(app)
        .patch('/api/comments/999')
        .send({ inc_votes: 234 })
        .expect(404)
        .then(result => expect(result.body).to.eql({ msg: 'not found' }));
    });
    it('returns an error when the comments_id is not valid', () => {
      return request(app)
        .patch('/api/comments/not_an_integer')
        .send({ inc_votes: 234 })
        .expect(400)
        .then(result => expect(result.body).to.eql({ msg: 'invalid request' }));
    });
  });
  describe('DELETE /api/comments/:comment_id', () => {
    it('deletes a selected comment', () => {
      return request(app)
        .delete('/api/comments/5')
        .expect(204);
    });
    it('returns an error when an id that does not exist is submitted', () => {
      return request(app)
        .delete('/api/comments/245')
        .expect(404)
        .then(result => {
          expect(result.body).eql({ msg: 'not found' });
        });
    });
    it('returns an error when an id that does not exist is submitted', () => {
      return request(app)
        .delete('/api/comments/not_an_integer')
        .expect(400)
        .then(result => {
          expect(result.body).eql({ msg: 'invalid request' });
        });
    });
  });
  describe(' GET /api', () => {
    it('retrieves information about all endpoints', () => {
      return request(app)
        .get('/api')
        .then(result => {
          expect(result.body.endPoints).to.have.all.keys([
            'topics',
            'users',
            'articles',
            'comments'
          ]);
        });
    });
  });
});
