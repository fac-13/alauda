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


/**
 * Clear the content of index.html by removing the children of <main>
 */
var clearContents = function () {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

/**
 * Generate the home page 
 */
const generateHomePage = function(){
  clearContents(); 
  homePageHTML(); 
  const tryMeButton = document.getElementById('button__tryMe'); 
  tryMeButton.addEventListener('click', generateGiftPage);
}

/**
 * Create the elements of the homepage
 */
const homePageHTML = function(){
  return main.innerHTML = `
  <button id="button__tryMe">Try Me</button>
  `
}

/**
 * Generate the random gift page 
 */
const generateGiftPage = function () {
  clearContents();
  randomGiftHTML(); 
  var goBackButton = document.getElementById('button__goBack'); 
  goBackButton.addEventListener('click', generateHomePage); 
  var randomGift = document.getElementById('button__randomGift'); 
  randomGift.addEventListener('click', checkOffline);
}

/**
 * Create the elements of the random gift page
 */
const randomGiftHTML = function(){
  return main.innerHTML = `
  <nav>
  <button id="button__goBack">
  <i class="fas fa-arrow-circle-left"></i>
  </button>
  </nav>
  <p>I am the gift page</p>
  <button id="button__randomGift">Gift</button>
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


window.addEventListener('load', generateHomePage()); 
