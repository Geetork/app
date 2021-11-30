const redis = require('redis');
const db = redis.createClient();

class Article {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    };
  };

  save(cb) {
    const articleJSON = JSON.stringify(this);
    db.lpush(
      'entries',
      articleJSON,
      (err) => {
        if (err) return cb(err);
        cb();
      }
    );
  };
};

module.exports = Article;
