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

if (window.location.pathname == '/thankYou') {
  Notification.requestPermission((status) => {
    console.log('Notification permission status:', status);
    if (Notification.permission == 'granted') {
      displayNotification();
    }
  });
}

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
  });
}
