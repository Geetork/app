// modules setup
const mongoose = require('mongoose');

// mongodb model setup
const articleSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const ArticleSchema = mongoose.model('article', articleSchema);

class Article {

  constructor( owner, title, content ) {
    this.owner = owner;
    this.title = title;
    this.content = content;
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
