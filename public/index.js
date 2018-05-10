/* eslint-disable */
var main = document.querySelector('main');
var buttonTryMe = document.getElementById('button__tryme');

/**
 * Check if there is a service worker and register it
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () { console.log("Service Worker Registered"); });
}

buttonTryMe.addEventListener('click', function () {
  generateGiftPage();
});

/**
 * Clear the content of index.html by removing the children of <main>
 */
var clearContents = function () {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

/**
 * Generate the random gift page 
 */
var generateGiftPage = function () {
  clearContents();
  randomGiftHTML(); 
  var goBackButton = document.getElementById('goBackButton'); 
  goBackButton.addEventListener('click', generateHomePage); 
  var randomGift = document.getElementById('randomGift'); 
  randomGift.addEventListener('click', checkOffline);
}

/**
 * Create the elements of the random gift page
 */
var randomGiftHTML = function(){
  return main.innerHTML = `
  <button id="goBackButton">
  <i class="fas fa-arrow-circle-left"></i>
  </button>
  <p>I am the gift page</p>
  <button id="randomGift">Gift</button>
  `
}

/**
 * Generate content page and ...
 */
var generateContentPage = function () {
  clearContents();
  var content = document.createElement('div');
  var contentText = document.createTextNode('This is the content page');
  content.appendChild(contentText);
  main.appendChild(content);
}

/**
 * Check if user is offline, open dialog box
 */
var checkOffline = function () {
  if (!navigator.onLine) {
    var offlineMessage = document.createElement('dialog');
    var offlineMessageText = document.createTextNode('Ooops! You need to be online to open your gift.');
    offlineMessage.appendChild(offlineMessageText);
    main.appendChild(offlineMessage);
    setTimeout(() => {
      offlineMessage.show();
    }, 500);
    setTimeout(() => {
      offlineMessage.close();
    }, 4000);
  } else {
    generateContentPage()
  }
}
