exports.list = (req, res) => {
  let articles = [{"title": "article1", "content": "discription1"}];
  res.render('articles', {
    title: 'Articles',
    articles: articles
  })
};
