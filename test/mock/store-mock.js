'use strict';

const Cursor = require(`./cursor-mock`);
const generator = require(`../../generateEntity.js`);

class PostsStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getDatedPost(dateParam) {
    return this.data.filter((post) => post.date === dateParam);
  }

  async getAllPosts() {
    return new Cursor(this.data);
  }

  async save() {
    return {
      insertedId: 42
    };
  }
}

const posts = [];
for (let i = 0; i < 25; i++) {
  posts.push(generator());
}
posts[posts.length - 1].date = 15111111;

module.exports = new PostsStoreMock(posts);
