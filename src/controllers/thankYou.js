exports.get = (req, res) => {
  const { username } = req.session;
  const initial = username[0];
  res.render('thankYou', {
    thankYou: true, backLink: '/login', user: `${req.params.username}`, initial,
  });
};
