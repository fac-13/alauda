const content = require('../../content.json');
const { getUser } = require('./../model/queries/getUser');

const getUserContent = likes => likes.reduce((acc, item) => (acc[item] = content[item], acc), {});

exports.get = async (req, res) => {
  if (req.session.length > 0) {
    const { username, loggedIn } = req.session;
    const initial = username[0].toUpperCase();
    try {
      const user = await getUser(username);
      const likedContent = getUserContent(user.like);
      res.render('usercontent', {
        likedContent, usercontent: true, username, initial,
      });
    } catch (err) {
      const error = err.message;
      res.render('error', { error });
    }
  }
};
