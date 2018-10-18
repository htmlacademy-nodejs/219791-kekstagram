'use strict';

const assert = require(`assert`);
const request = require(`supertest`);
const app = require(`../commands/server`).initServer();
const generator = require(`../generateEntity.js`);

const TEST_POSTS_LENGTH = 25;

describe(`GET /api/posts`, () => {
  it(`resopond with json`, async () => {

    const response = await request(app).
      get(`/api/posts`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    assert.equal(response.body.data.length, TEST_POSTS_LENGTH);
  });
  it(`get data from unknown resource`, async () => {
    return await request(app).
      get(`/api/errorTest`).
      set(`Accept`, `application/json`).
      expect(404).
      expect(`Page was not found`).
      expect(`Content-Type`, /html/);
  });
});

describe(`GET /api/posts/:date`, () => {
  it(`have posts with specific timestamp`, async () => {
    const response = await request(app).
      get(`/api/posts/15111111`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);
    assert.equal(response.body.date === 15111111, true);
  });
});

describe(`POST /api/posts`, () => {
  const testPost = generator();

  it(`sends post as json`, async () => {
    const response = await request(app)
      .post(`/api/posts`)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `application/json`)
      .send(testPost)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.deepEqual(testPost, response.body);
  });

  it(`sends post as form-data`, async () => {
    const response = await request(app)
      .post(`/api/posts`)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .field(`description`, testPost.description)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.equal(testPost.description, response.body.description);
  });
});
