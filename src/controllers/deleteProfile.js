const { deleteUser } = require('./../model/queries/deleteUser');

exports.get = async (req, res) => {
  console.log('you have reached the delete profile', req.session);
  const { username } = req.session;
  console.log(username);
  try {
    await deleteUser(username);
    res.render('deleteProfile');
  } catch (err) {
    console.log(err);
  }

};

