const { getUser } = require('./../model/queries/getUser');

exports.get = async (req, res) => {
  if (req.session.username === req.params.username) {
    try {
      const user = await getUser(req.session.username);
      const userLikes = user.like;
      res.render('profile', { userLikes, backLink: `/usercontent/${req.session.username}` });
    } catch (err) {
      res.render('profile', {
        errorMessage: 'Something went wrong. We have no idea what it was'
      });
    }
  }
};
