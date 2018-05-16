/* eslint-disable */

/**
 * Check if there is a service worker and register it
 */
if ('serviceWorker' in navigator) {
  fetchContent('/api/firstContent')
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    console.log('Service Worker Registered');
    pushManagerSubscription(reg);
  })
    .catch((err) => {
      console.log('Service worker registration failed', err);
    })
}

/**
 * Ask permission for send push notification
 */
if (window.location.pathname == '/thankYou') {
  Notification.requestPermission((status) => {
    console.log('Notification permission status:', status);
    if (Notification.permission == 'granted') {
      displayNotification();
    }
  });
}

/**
 * show costum notification
 */
function displayNotification() {
  console.log('NOTIFICATION REACHED');
  navigator.serviceWorker.getRegistration().then((reg) => {
    console.log('SERVICEWORKER REGISTERED');
    var options = {
      body: 'Here is a notification body!',
      icon: 'images/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 'Parissa'   // assign each user a unique identification 
      }
    };
    reg.showNotification('Hello world!', options);
  })
}

/**
 * add event listener costum push
 */
self.addEventListener('push', function (e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'Parissa'
    }
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});

/**
 * * @param  {} reg - registration object
 * Subscribe to pushManager 3rd-party server 
 */
function pushManagerSubscription(reg) {
  reg.pushManager.subscribe(options).then(function (sub) {
    console.log("Sub", sub)
    if (sub === null) {
      // Update UI to ask user to register for Push
      console.log('Not subscribed to push service!');
    } else {
      // We have a subscription, update the database
      console.log('Subscription object: ', sub);
    }
  })
}

/**
 * Add event listeer to randomGiftButton to check if the user is online 
 */
if (window.location.pathname == '/try') {
  randomGift.addEventListener('click', () => {
    checkOffline();
  });
}

/**
 * Check if user is online, if offline open dialog box
 */
const checkOffline = () => {
  if (!window.navigator.onLine) {
    const dialog = document.querySelector('dialog');
    setTimeout(() => {
      dialog.show();
    }, 500);
    setTimeout(() => {
      dialog.close();
    }, 4000);
  } else {
    fetchContent('/api/content');
  }
}

/**
 * stores content in localStorage
 */
const storeContent = () => {
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
