exports.list = (req, res) => {
  let articles = [{"title": " ", "content": " "}];
  res.render('articles', {
    title: 'Новостные статьи',
    articles: articles
  })
};
