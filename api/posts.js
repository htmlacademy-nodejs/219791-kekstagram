'use strict';

const express = require(`express`);
const generator = require(`../generateEntity.js`);

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);

const postsNumber = 25;
const posts = [];

const DEFAULT = {
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
  const skip = parseInt(req.query.skip, 10) || DEFAULT.SKIP;
  const limit = parseInt(req.query.limit, 10) || DEFAULT.LIMIT;
  const result = posts.slice(skip).slice(0, limit);

  res.send({
    "data": result,
    "skip": skip,
    "limit": limit
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

  res.send(datedPost);
});

module.exports = router;
