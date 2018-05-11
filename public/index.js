/* eslint-disable */
var main = document.querySelector('main');
var buttonTryMe = document.getElementById('button__tryme');

//fetch data and store in localStorage every day at 7am local time

var content = localStorage.getItem('content')
  ? JSON.parse(localStorage.getItem('content'))
  : {};


/**
 * Check if there is a service worker and register it
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log('Service Worker Registered');
  });
}

buttonTryMe.addEventListener('click', function() {
  clearContents();
  generateGiftPage();
  setTimeout(() => {
    fetchContent()
  }, 86400000);
});

/**
 * Clear the content of index.html by removing the children of <main>
 */
var clearContents = function() {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
};

/**
 * Generate the random gift page building all necessary elements
 */
var generateGiftPage = function() {
  var hello = document.createElement('p');
  var helloText = document.createTextNode('I am the gift page');
  var randomGift = document.createElement('button');
  randomGift.setAttribute = ('id', 'random-gift');
  hello.appendChild(helloText);
  randomGift.innerText = 'Random Gift';
  main.appendChild(hello);
  var tryMeGiftButton = document.createElement('button');
  var tryMeGiftButtonText = document.createTextNode('gift');
  tryMeGiftButton.appendChild(tryMeGiftButtonText);
  main.appendChild(tryMeGiftButton);
  tryMeGiftButton.addEventListener('click', checkOffline);
};

/**
 * Generate content page and ...
 */
var generateContentPage = function() {
  clearContents();
  var content = document.createElement('div');
  var contentText = document.createTextNode('This is the content page');
  content.appendChild(contentText);
  main.appendChild(content);
};

/**
 * Check if user is offline, open dialog box
 */
var checkOffline = function() {
  if (!navigator.onLine) {
    var offlineMessage = document.createElement('dialog');
    var offlineMessageText = document.createTextNode(
      'Ooops! You need to be online to open your gift.'
    );
    offlineMessage.appendChild(offlineMessageText);
    main.appendChild(offlineMessage);
    setTimeout(() => {
      offlineMessage.show();
    }, 500);
    setTimeout(() => {
      offlineMessage.close();
    }, 4000);
  } else {
    generateContentPage();
    renderContent(content);
  }
};
/**
 * fetch content from server
 */
var fetchContent = function () {
  console.log("function called")
  fetch('/api/content')
    .then(response => {
      return response.json();
    })
    .then(data => {
      content = data;
      storeContent(content);
    });
};

/**
 * stores content in localStorage
 */
var storeContent = function() {
  localStorage.setItem('content', JSON.stringify(content));
};
/**
 * @param  {} data - content from the server with combined response from all API calls
 * render content to content page
 */
var renderContent = function(data) {
  data.placeholder.map(el => {
    var giphy = document.createElement('img');
    giphy.setAttribute('height', '200px');
    giphy.src = el;
    main.appendChild(giphy);
  });
};
