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
  clearContents();
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
 * Generate the random gift page building all necessary elements
 */
var generateGiftPage = function () {
  var hello = document.createElement('p');
  var helloText = document.createTextNode('I am the gift page');
  hello.appendChild(helloText);
  main.appendChild(hello);
  var tryMeGiftButton = document.createElement('button');
  var tryMeGiftButtonText = document.createTextNode('gift');
  tryMeGiftButton.appendChild(tryMeGiftButtonText);
  main.appendChild(tryMeGiftButton)
  tryMeGiftButton.addEventListener('click', checkOffline)
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
