const request = require('supertest');
const app = require('../../src/app');

describe('Test the home path', () => {
  test('It should send the response after the GET method executes', () =>
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      }));
  test('It should produce a page with a button that says Try Me', () =>
    request(app)
      .get('/')
      .then((response) => {
        expect(response.text.includes('<a href="/try">Try Me</a>')).toBe(true);
      }));
  test('It should produce a page with a button that has id button__tryMe', () =>
    request(app)
      .get('/')
      .then((response) => {
        expect(response.text.includes('<button id="button__tryMe">')).toBe(true);
      }));
});

describe('Test the api path', () => {
  test('It should send the content object', () =>
    request(app)
      .get('/api/content')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(typeof response).toBe('object');
      }));
});

describe('Test the try path', () => {
  test('It should send the content object', () =>
    request(app)
      .get('/try')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(typeof response).toBe('object');
      }));
  test('It should send the content object', () =>
    request(app)
      .get('/try')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text.includes('<!DOCTYPE html>')).toBe(true);
      }));
});

