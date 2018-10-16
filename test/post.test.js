'use strict';

const assert = require(`assert`);
const request = require(`supertest`);
const app = require(`../commands/server`).initServer();

const TEST_POSTS_LENGTH = 25;

describe(`GET /api/posts`, () => {
  it(`resopond with json`, async () => {

    const response = await request(app).
      get(`/api/posts`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    assert.equal(response.body.length, TEST_POSTS_LENGTH);
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

    const result = response.body.find((post) => post.date === 15111111);
    assert.equal(result !== undefined, true);
  });
});
