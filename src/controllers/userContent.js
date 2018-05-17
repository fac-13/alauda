const content = require('../../content.json');

exports.get = async (req, res) => {
    if (req.session.length > 0) 
    {
        const { username, loggedIn } = req.session;
        const user = await getUser(username);
        console.log(req.session);
        console.log(user);
        console.log(content.articles[0].title);
        let art = content.articles;
        res.render('usercontent', { art });
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