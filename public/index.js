
/* eslint-disable */
const main = document.querySelector('main');
const tryMeButton = document.getElementById('button__tryMe');
const randomGift = document.getElementById('link__randomGift'); 

let content = localStorage.getItem('content')
  ? JSON.parse(localStorage.getItem('content'))
  : {};



/**
 * fetch API content from server
 */
const fetchContent = (url) => {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then((data) => {
      console.log("Data:", data)
      content = data;
      storeContent(content);
      renderContent(content);
    });
};


/**
 * Check if there is a service worker and register it
 */
if ('serviceWorker' in navigator) {
  fetchContent('/api/firstContent')
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker Registered');
  });
}

if (location.url == "/") {
  tryMeButton.addEventListener('click', (e) => console.log(e));
};

/**
 * Add event listeer to randomGiftButton to check if the user is online 
 */
if (location.url == '/try') {
  randomGift.addEventListener('click', () => {
    checkOffline(); 
  }); 
}


/**
 * Check if user is online, if offline open dialog box
 */
const checkOffline = () => {
  console.log("Checkoffline reached"); 
  if (!navigator.onLine) {
    console.log("You are offline"); 
    const dialog = document.querySelector('dialog'); 
    setTimeout(() => {
      dialog.show();
    }, 500);
    setTimeout(() => {
      dialog.close();
    }, 4000);
  } else {
    console.log("You are online");
    fetchContent('/api/content'); 
  }
}



/**
 * stores content in localStorage
 */
const storeContent = () => {
  console.log("Store Content reached")
  localStorage.setItem('content', JSON.stringify(content));
};


/**
 * @param  {} content - content stored in localStorage 
 * Render content on the page 
 */

const renderContent = (content) => {
  const section = document.querySelector('.section__content'); 
  content[0].map((el) => {
    const articles = `<div class="content__articles"><a href="${el.url}" target="_blank" class="link__title"><h3 class="title">${el.title}</h3></a><p>${el.description}</p><img class="img__article" src="${el.urlToImage}"/></div>"`
    section.insertAdjacentHTML('beforeend', articles);
  });
  content[1].map((el) => {
    const giphy = `<img class="img__giphy"src=${el.images.downsized.url} alt="Giphy" height="200px" />`
    section.insertAdjacentHTML('beforeend', giphy);
  });
};


