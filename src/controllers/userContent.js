const content = require('../../content.json');
const { getUser } = require('./../model/queries/getUser');

const getUserContent = likes => likes.reduce((acc, item) => (acc[item] = content[item], acc), {});

exports.get = async (req, res) => {
  if (req.session.length > 0) {
    const { username, loggedIn } = req.session;
    try {
      const user = await getUser(username);
      const likedContent = getUserContent(user.like);
      res.render('usercontent', { likedContent, usercontent: true, username });
    } catch (err) {
      console.log(err);
    }
  }
};


// exports.get = async (req, res) => {
//     if (req.session.username === req.params.username) {
//       const user = await getUser(req.session.username);
//       const userLikes = user.like;
//       res.render('profile', { userLikes });
//     }
//   };


// const foundUser = await getUser(loginusername);

// exports.get = (req, res) => {
//   if (req.session.length > 0) {
//     const { username, loggedIn } = req.session;
//     getAllPosts()
//       .then((queryRes) => {
//         const posts = JSON.parse(JSON.stringify(queryRes));
//         res.render('home', { posts, username, loggedIn });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } else {
//     getAllPosts()
//       .then((queryRes) => {
//         const posts = JSON.parse(JSON.stringify(queryRes));
//         res.render('home', { posts });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// };
