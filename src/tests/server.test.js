const request = require('supertest');
const app = require('../../src/app');

describe('Test the home path', () => {
  test('It should send the response after the GET method executes with status code 200', () =>
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      }));
  test('It should send an html page', () =>
    request(app)
      .get('/')
      .then((response) => {
        expect(response.type).toBe('text/html');
      }));
  test('It should produce a page with a Try Me button', () =>
    request(app)
      .get('/')
      .then((response) => {
        expect(response.text.includes('<a class="link" href="/try"><button id="button__tryMe" class="button button__tryme">Try Me</button></a>')).toBe(true);
      }));
  test('It should produce a page with a button that has id button__tryMe', () =>
    request(app)
      .get('/')
      .then((response) => {
        expect(response.text.includes('<button id="button__tryMe" class="button button__tryme">')).toBe(true);
      }));
});

describe('Test the api path', () => {
  test('It should send the content object', () =>
    request(app)
      .get('/api/content')
      .then((response) => {
        expect(typeof response).toBe('object');
      }));
});

describe('Test the try path', () => {
  test('It should send the response after the GET method executes with status code 200', () =>
    request(app)
      .get('/try')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      }));
  test('It should have a section', () =>
    request(app)
      .get('/randomContent')
      .then((response) => {
        expect(response.text.includes('<section')).toBe(true);
      }));
  test('It should send an html page', () =>
    request(app)
      .get('/try')
      .then((response) => {
        expect(response.type).toBe('text/html');
      }));
});

