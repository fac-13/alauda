const request = require('supertest');
const router = require('../controllers/index');
console.log(router);
describe('Test the root path', () => {
  test('It should response the GET method', () =>
    request(router)
      .get('/')
      .expect(200));
});
