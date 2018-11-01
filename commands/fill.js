'use strict';

const generator = require(`../generate-entity.js`);
const store = require(`../store.js`);

const POSTS_NUMBER = 25;

module.exports = {
  name: `fill`,
  description: `Fills database with ${POSTS_NUMBER} generated objects`,
  async execute() {
    await store.drop();

    for (let post, i = 0; i < POSTS_NUMBER; i++) {
      post = generator();
      if (i === POSTS_NUMBER - 1) {
        post.date = 15111111;
      }
      await store.save(post);
    }

    console.log(`${POSTS_NUMBER} posts generated`);
    process.exit(0);
  }
};
