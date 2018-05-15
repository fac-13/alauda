(function () {
  console.log('Push Notification reached');
  console.log('URL', window.location.pathname);
  if (window.location.pathname == '/thankYou') {
    Notification.requestPermission((status) => {
      console.log('Notification permission status:', status);
    });
  }
}());
