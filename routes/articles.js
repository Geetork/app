const Article = require('../models/article');

exports.list = (req, res) => {
  Article.findArticles(req.session.uid).then((result) => {
    res.render('articles', {
      title: 'Новостные статьи',
      articles: result
    });
  })
};

exports.submit = (req, res, next) => {
  const data = req.body.article;
  let article = new Article(req.session.uid, data.title, data.content);
  article.save();
  res.redirect('/articles')
};
