const dbconnection = require('../model/database/dbconnection');
const { dbconnect } = require('../model/database/dbconnection');

const { create } = require('../model/queries/createUser');
const { User } = require('../model/database/userSchema');
const mongoose = require('mongoose');

require('env2')('./.env');

// const User = beforeAll(() => {
//   mongoose.model('User', UserSchema);
// });

// const testUser1 = beforeAll(() => {
//   User.create({
//     username: 'Katia',
//     password: 'sdfshdfs',
//   });
// });

test('Should fail when env not test ', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});

// test('Should use test database url ', () => {
//   expect(dbconnect).toEqual('mongodb://localhost/testalaudadb');
// });

test('Test if database connection exists', () => {
  expect(mongoose.connection.name).toEqual('testalaudadb');
});

// describe('Test the removeComment method', () => {
//   console.log('New user:', testUser1.username);
// });
