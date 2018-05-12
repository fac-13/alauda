/* eslint-disable */
const main = document.querySelector('main');
const buttonTryMe = document.getElementById('button__tryme');
const randomGiftButton = document.getElementById('button__randomGift'); 

let content = localStorage.getItem('content')
  ? JSON.parse(localStorage.getItem('content'))
  : {};

/**
 * Check if there is a service worker and register it
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker Registered');
  });
}

/**
 * Add event listeer to randomGiftButton to check if the user is online 
 */
randomGiftButton.addEventListener('click', () => {
  checkOffline(); 
}); 

/**
 * Check if user is online, if offline open dialog box
 */
const checkOffline = () => {
  // console.log("Checkoffline reached"); 
  // if (!navigator.onLine) {
  //   console.log("You are offline"); 
  //   const dialog = document.querySelector('dialog'); 
  //   setTimeout(() => {
  //     dialog.show();
  //   }, 500);
  //   setTimeout(() => {
  //     dialog.close();
  //   }, 4000);
  // } else {
  //   console.log("You are online");
    fetchContent(); 
  // }
}


/**
 * fetch API content from server
 */
const fetchContent = () => {
  fetch('/api/content')
    .then(response => {
      return response.json();
    })
    .then((data) => {
      console.log("Data:", data)
      content = data;

      // storeContent(content);
      renderContent(content); 
    });
};

/**
 * stores content in localStorage
 */
// const storeContent = () => {
//   console.log("Store Content reached")
//   localStorage.setItem('content', JSON.stringify(content));
// };


/**
 * @param  {} content - content stored in localStorage 
 * Render content on the page 
 */
const renderContent = (content) => {
  console.log("Rendercontent reached")
  const section = document.querySelector('section'); 
  content.placeholder.map((el) => {
    const giphy = `<img src=${el} alt="Giphy" height="200" />`
    section.insertAdjacentHTML('beforeend', giphy);
  })
};


