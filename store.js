'use strict';

const db = require(`./database/db`);

const setupCollection = async () => {
  const dBase = await db;

  return dBase.collection(`kekstagramPost`);
};

class PostsStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getDatedPost(date) {
    return (await this.collection).findOne({date});
  }

  async getAllPosts() {
    return (await this.collection).find();
  }

  async save(postData) {
    return (await this.collection).insertOne(postData);
  }

  async drop() {
    return (await this.collection).drop((err, delOK) => {
      if (err) {
        throw err;
      }

      if (delOK) {
        console.log(`"kekstagramPost" collection deleted`);
      }

      this.collection = setupCollection();
    });
  }
}

module.exports = new PostsStore(setupCollection().
  catch((e) => console.error(`Failed to set up "kegstagramPosts"-collection`, e)));
