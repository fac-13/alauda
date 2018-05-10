const fetch = require('node-fetch');

exports.get = (req, res) => {
    console.log("randomGift.js is reached")

//       /**
//    * fetch content from server
//    */
//   const fetchContent = () => {
//     fetch('http://localhost:3000/api/content')
//       .then(response => {
//         return response.json();
//       })
//       .then((data) => {
//         content = data;
//         storeContent(content);
//       });
//   };

//   /**
//    * stores content in localStorage
//    */
//   const storeContent = () => {
//     localStorage.setItem('content', JSON.stringify(content));
//   };

//   fetchContent();
  

    res.render('randomGift');
  };