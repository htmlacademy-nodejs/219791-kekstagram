'use strict';

const express = require(`express`);
const jsonParser = express.json();
const multer = require(`multer`);
const upload = multer({storage: multer.memoryStorage()});

const validation = require(`./validation.js`);

const generator = require(`../generateEntity.js`);

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const ValidationError = require(`../error/validation-error`);

const postsNumber = 25;
const posts = [];

const Default = {
  SKIP: 0,
  LIMIT: 25
};

// eslint-disable-next-line new-cap
const router = express.Router();

for (let i = 0; i < postsNumber; i++) {
  posts.push(generator());
}
posts[posts.length - 1].date = 15111111;

router.get(``, (req, res) => {
  const skip = parseInt(req.query.skip, 10) || Default.SKIP;
  const limit = parseInt(req.query.limit, 10) || Default.LIMIT;
  const result = posts.slice(skip).slice(0, limit);

  res.send({
    "data": result,
    "skip": skip,
    "limit": limit,
    "total": result.length
  });
});

router.get(`/:date`, (req, res) => {
  const dateParam = parseInt(req.params.date, 10);

  if (!dateParam) {
    throw new IllegalArgumentError(`Incorrect data format`);
  }

  const datedPost = posts.filter((post) => post.date === dateParam);

  if (!datedPost || datedPost.length === 0) {
    throw new NotFoundError(`No posts dated ${dateParam}`);
  }

  res.send(datedPost[0]);
});

router.post(``, jsonParser, upload.none(), (req, res) => {
  const errors = validation.check(req.body);
  console.log(`errors`, errors);
  if (errors.length > 0) {
    throw new ValidationError(`Incorrect fields are: ${errors.join(`, `)}`);
  }
  res.send(req.body);
});

module.exports = router;
