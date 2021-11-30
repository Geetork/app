const Article = require('../models/article');

exports.list = (req, res) => {
  let articles = [{"title": " ", "content": " "}];
  res.render('articles', {
    title: 'Новостные статьи',
    articles: articles
  })
};

exports.submit = (req, res, next) => {
  const data = req.body.article;
  let article = new Article(data.login, data.title, data.content);

};
