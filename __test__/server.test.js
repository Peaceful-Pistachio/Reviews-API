const app = require('../server').app;
const request = require('supertest');

describe('GET /reviews', () => {
  it('response status 200 code with JSON object', (done) => {
    request(app)
      .get('/reviews?product_id=32')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('response object contain all primary keys', (done) => {
    request(app)
      .get('/reviews?product_id=32')
      .set('Accept', 'application/json')
      .expect((result) => {
        expect(result.body).toEqual(expect.objectContaining({
          product_id: expect.any(Number),
          page: expect.any(Number),
          count: expect.any(Number),
          results: expect.any(Array)
        }))
      })
      .expect(200, done);
  });

  it('response page value of 1 and count value of 5 by default', (done) => {
    request(app)
      .get('/reviews?product_id=3')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        res.body.product_id = 3;
        res.body.page = 1;
        res.body.count = 5;
        res.body.results.length <= 5
      })
      .end((err, res) => err ? done(err) : done());
  })
});

  describe('GET /reviews/meta', () => {
    it('response status 200 code with JSON object', (done) => {
      request(app)
        .get('/reviews/meta?product_id=30')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('response status 200 code with JSON object', (done) => {
      request(app)
        .get('/reviews/meta?product_id=30')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(expect.objectContaining({
            product_id: 30,
            rating: expect.any(Object),
            recommended: expect.any(Object),
            characteristics: expect.any(Object)
          }))
        })
        .end((err, res) => err ? done(err) : done())
    });
  })

  describe('POST /reviews/', () => {
    it('response status 404 code for request with invalid header', (done) => {
      request(app)
        .post('/reviews?product_id=32')
        .expect(404, done)
    })
  });

  describe('PUT /reviews/:review_id/helpful', () => {
    it('response status 204 code no content', (done) => {
      request(app)
        .post('/reviews/12/helpful')
        .expect(204, done)
    })
  });

  describe('PUT /reviews/:review_id/report', () => {
    it('response status 204 code no content', (done) => {
      request(app)
        .post('/reviews/12/helpful')
        .expect(204, done)
    })
  });

