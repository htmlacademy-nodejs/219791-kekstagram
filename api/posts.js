'use strict';

const express = require(`express`);
const jsonParser = express.json();
const multer = require(`multer`);
const upload = multer({storage: multer.memoryStorage()});
const toStream = require(`buffer-to-stream`);

const validation = require(`./validation.js`);

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const ValidationError = require(`../error/validation-error`);

const logger = require(`../logger`);

const Default = {
  SKIP: 0,
  LIMIT: 25
};

// eslint-disable-next-line new-cap
const router = express.Router();

const toPage = async (cursor, skip, limit) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

router.get(``, asyncMiddleware(async (req, res) => {
  const skip = parseInt(req.query.skip, 10) || Default.SKIP;
  const limit = parseInt(req.query.limit, 10) || Default.LIMIT;

  res.send(await toPage(await router.store.getAllPosts(), skip, limit));
}));

router.get(`/:date`, asyncMiddleware(async (req, res) => {
  const dateParam = parseInt(req.params.date, 10);

  if (!dateParam) {
    throw new IllegalArgumentError(`Incorrect data format`);
  }

  const datedPost = await router.store.getDatedPost(dateParam);

  if (!datedPost || datedPost.length === 0) {
    throw new NotFoundError(`No posts dated ${dateParam}`);
  }

  res.send(datedPost);
}));

router.get(`/:date/image`, asyncMiddleware(async (req, res) => {
  const dateParam = parseInt(req.params.date, 10);

  if (!dateParam) {
    throw new IllegalArgumentError(`Incorrect data format`);
  }

  const datedPost = await router.store.getDatedPost(dateParam);

  if (!datedPost || datedPost.length === 0) {
    throw new NotFoundError(`No posts dated ${dateParam}`);
  }

  const result = await router.imageStore.get(datedPost._id);

  if (!result) {
    throw new NotFoundError(`No image for post dated ${dateParam}`);
  }

  res.header(`Content-Type`, `image/jpg`);
  res.header(`Content-Length`, result.info.length);

  res.on(`error`, (e) => logger.error(e));
  res.on(`end`, () => res.end());
  const stream = result.stream;
  stream.on(`error`, (e) => logger.error(e));
  stream.on(`end`, () => res.end());
  stream.pipe(res);
}));

router.post(``, jsonParser, upload.single(`filename`), asyncMiddleware(async (req, res) => {
  const fileName = req.file && req.file.buffer;
  const body = req.body;
  body.date = body.date ? body.date : Date.now();
  body.url = fileName ? `/api/posts/${body.date}/image` : false;

  const errors = validation.check(body, fileName);

  if (errors.length > 0) {
    throw new ValidationError(`Incorrect fields are: ${errors.join(`, `)}`);
  }

  const result = await router.store.save(body);
  await router.imageStore.save(result.insertedId, toStream(fileName));

  res.send(body);
}));

module.exports = (store, imageStore) => {
  router.store = store;
  router.imageStore = imageStore;
  return router;
};
