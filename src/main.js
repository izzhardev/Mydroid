const startAirDroidServer = async () => {
  const el = document.querySelector('#app');
  const httpd = window.cordova?.plugins?.CorHttpd;

  if (!httpd) {
    el.innerHTML = 'Plugin tidak ada';
    return;
  }

  httpd.startServer({
    www_root: 'public',
    port: 8080,
    localhost_only: false
  }, () => {

    httpd.getURL((url) => {
      el.innerHTML = `
        <h2>✅ Server Aktif</h2>
        <p>${url}</p>
      `;
    });

  }, (err) => {
    el.innerHTML = `<h2>Error: ${err}</h2>`;
  });
};
