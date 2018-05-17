exports.get = (req, res) => {
  res.render('thankYou', { thankYou: true, backLink: '/login', user: `${req.params.username}` });
};
