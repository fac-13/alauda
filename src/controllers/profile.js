const { getUser } = require('./../model/queries/getUser');

exports.get = async (req, res) => {
  if (req.session.username === req.params.username) {
    const user = await getUser(req.session.username);
    const userLikes = user.like;
    res.render('profile', { userLikes, backLink: `/usercontent/${req.session.username}` });
  }
};

