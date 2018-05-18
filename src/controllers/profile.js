const { getUser } = require('./../model/queries/getUser');

exports.get = async (req, res) => {
  const { username } = req.session;
  const initial = username[0].toUpperCase();
  if (username === req.params.username) {
    try {
      const user = await getUser(username);
      const userLikes = user.like;
      res.render('profile', {
        userLikes, backLink: `/usercontent/${req.session.username}`, username, initial,
      });
    } catch (err) {
      res.render('profile', {
        errorMessage: 'Something went wrong. We have no idea what it was',
      });
    }
  }
};
