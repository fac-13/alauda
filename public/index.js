/* eslint-disable */
const main = document.querySelector('main');
const buttonTryMe = document.getElementById('button__tryme');

let content = localStorage.getItem('content')
  ? JSON.parse(localStorage.getItem('content'))
  : {};

/**
 * Check if there is a service worker and register it
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function () {
    console.log('Service Worker Registered');
  });
}

/**
 * Clear the content of index.html by removing the children of <main>
 */
const clearContent = () => {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
};

/**
 * Generate the home page 
 */
const generateHomePage = () => {
  clearContent();
  homePageHTML();
  const tryMeButton = document.getElementById('button__tryMe');
  tryMeButton.addEventListener('click', () => {
    fetchContent();
    generateRandomGiftPage();
  });
}

/**
 * Create the elements of the homepage
 */
const homePageHTML = () => {
  return main.innerHTML = `
  <h1>Allauda</h1>
  <button id="button__tryMe">Try Me</button>
  `
}

/**
 * Generate the random gift page 
 */
const generateRandomGiftPage = () => {
  clearContent();
  randomGiftHTML();
  const goBackButton = document.getElementById('button__goBack');
  goBackButton.addEventListener('click', generateHomePage);
  const randomGift = document.getElementById('button__randomGift');
  randomGift.addEventListener('click', checkOffline);
}

/**
 * Create the elements of the random gift page
 */
const randomGiftHTML = () => {
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
 * Generate content page
 */
const generateContentPage = () => {
  clearContent();
  contentPageHTML();
  const goBackButton = document.getElementById('button__goBack');
  goBackButton.addEventListener('click', generateRandomGiftPage);
};

/**
 * Create the elements of the content page
 */
const contentPageHTML = () => {
  return main.innerHTML = `
  <nav>
    <button id="button__goBack">
      <i class="fas fa-arrow-circle-left"></i>
    </button>
  </nav>
  <p>This is the content page</p>
  <section></section>
  `
}

/**
 * Check if user is offline, open dialog box
 */
const checkOffline = () => {
  if (!navigator.onLine) {
    const offlineMessage = document.createElement('dialog');
    const offlineMessageText = document.createTextNode(
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
}


/**
 * fetch content from server
 */
const fetchContent = () => {
  fetch('/api/content')
    .then(response => {
      return response.json();
    })
    .then((data) => {
      content = data;
      storeContent(content);
    });
};


/**
 * stores content in localStorage
 */
const storeContent = () => {
  localStorage.setItem('content', JSON.stringify(content));
};


/**
 * @param  {} data - content from the server with combined response from all API calls
 * render content to content page
 */
const renderContent = (data) => {

  data.placeholder.map((el) => {
    const section = document.querySelector('section');
    const giphy = `<img src=${el} alt="Giphy" height="200" />`
    section.insertAdjacentHTML('beforeend', giphy);
  })
};

window.addEventListener('load', generateHomePage());

