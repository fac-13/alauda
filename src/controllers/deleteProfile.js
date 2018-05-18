const { deleteUser } = require('./../model/queries/deleteUser');

exports.get = async (req, res) => {
  const { username } = req.session;
  try {
    await deleteUser(username);
    req.session = null;
    res.render('deleteProfile', { backLink: '/' });
  } catch (err) {
    res.render('deleteProfile', {
      errorMessage: 'User does not exist',
    });
  }
};

