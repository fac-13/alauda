require('env2')('.env');
const fetch = require('node-fetch');
const content = require('../../content.json'); 

exports.get = async (req, res) => {
  try {
  let responses = {}; 
  for (let item in content){
     responses[item] = []; 
     responses[item].push(content[item][0]); 
     responses[item].push(content[item][1]); 
  }
     res.send(responses);
} catch (err) {
  console.log("First content endpoint error:", err); 
}

};
