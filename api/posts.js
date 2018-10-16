'use strict';

const express = require(`express`);
const generator = require(`../generateEntity.js`);

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);

const postsNumber = 25;
const posts = [];

const DEFAULT = {
  skip: 0,
  limit: 25
};

for (let i = 0; i < postsNumber; i++) {
  posts.push(generator());
}
posts[posts.length - 1].date = 15111111;

// eslint-disable-next-line new-cap
const router = express.Router();

router.get(``, (req, res) => {
  const skip = parseInt(req.query.skip, 10) || DEFAULT.skip;
  const limit = parseInt(req.query.limit, 10) || DEFAULT.limit;

  res.send(posts.slice(skip).slice(0, limit));
});

router.get(`/:date`, (req, res) => {
  const dateParam = req.params.date;

  if (!parseInt(dateParam, 10)) {
    throw new IllegalArgumentError(`Incorrect data format`);
  }

  const datedPost = posts.filter((post) => post.date === parseInt(dateParam, 10));

  if (!datedPost || datedPost.length === 0) {
    throw new NotFoundError(`No posts dated ${dateParam}`);
  }

  res.send(datedPost);
});

module.exports = router;
