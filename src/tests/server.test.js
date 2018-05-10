const request = require('supertest');
const app = require('../../src/app');

describe('Test the root path', () => {
  test('It should response the GET method', () =>
    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
      }));
});

describe('Test the api path', () => {
  test('It should send the content object', () =>
    request(app)
      .get('/api/content')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(typeof response).toBe('object');
      }));
});
