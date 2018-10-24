'use strict';

const assert = require(`assert`);
const request = require(`supertest`);
const storeMock = require(`./mock/store-mock.js`);
const imageStoreMock = require(`./mock/imageStore-mock.js`);
const app = require(`../commands/server`).initServer(storeMock, imageStoreMock);

const generator = require(`../generateEntity.js`);

const TEST_POSTS_LENGTH = 25;

describe(`GET /api/posts`, () => {
  it(`resopond with json`, async () => {
    const response = await request(app).
      get(`/api/posts`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.data.length, TEST_POSTS_LENGTH);
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
    assert.equal(response.body[0].date === 15111111, true);
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
      .attach(`filename`, `static/photos/3.jpg`)
      .field(`url`, testPost.url)
      .field(`effect`, testPost.effect)
      .field(`scale`, testPost.scale)
      .expect(200)
      .expect(`Content-Type`, /json/);

    assert.equal(testPost.url, response.body.url);
    assert.equal(testPost.effect, response.body.effect);
    assert.equal(testPost.scale, response.body.scale);
  });

  it(`send post as form-data with no url and get error`, async () => {
    await request(app)
      .post(`/api/posts`)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .field(`url`, ``)
      .field(`effect`, testPost.effect)
      .field(`scale`, testPost.scale)
      .expect(400);
  });

  it(`sends post as json with incorrect scale value`, async () => {
    testPost.scale = 101;

    await request(app)
      .post(`/api/posts`)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `application/json`)
      .send(testPost)
      .expect(400);
  });
});
