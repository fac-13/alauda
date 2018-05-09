/* eslint-disable */
var main = document.querySelector('main');
var buttonTryMe = document.getElementById('button__tryme');

/**
 * Checks if there is a service worker and registers it
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () { console.log("Service Worker Registered"); });
}

buttonTryMe.addEventListener('click', function () {
  clearContents();
  generateGiftPage();
});

/**
 * Clears the content of index.html by removing the children of <main>
 */
var clearContents = function () {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  /**
   * Generates the random gift page building all necessary elements
   */
  var generateGiftPage = function () {
    var hello = document.createElement('p');
    var helloText = document.createTextNode('I am the gift page');
    hello.appendChild(helloText);
    main.appendChild(hello);
  }





