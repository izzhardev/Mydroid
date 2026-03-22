import './style.css'

const startAirDroidServer = async () => {
  const displayElement = document.querySelector('#app');
  const httpd = window.cordova?.plugins?.CorHttpd;

  if (!httpd) {
    displayElement.innerHTML = `<h2>❌ Plugin HTTP Server tidak ditemukan</h2>`;
    return;
  }

  httpd.startServer({
    www_root: 'public', // 🔥 HARUS ADA DI ASSETS
    port: 8080,
    localhost_only: false
  }, () => {

    httpd.getURL((url) => {
      displayElement.innerHTML = `
        <div style="text-align:center;padding:20px">
          <h1 style="color:#4CAF50;">✅ AirDroid Mode Aktif</h1>
          <p>Buka di browser:</p>

          <h2 style="background:#eee;padding:10px;border-radius:8px">
            ${url}
          </h2>

          <p style="font-size:14px;color:#666">
            Pastikan 1 WiFi
          </p>
        </div>
      `;
    });

  }, (err) => {
    displayElement.innerHTML = `<h2>❌ Error: ${err}</h2>`;
  });
};

document.addEventListener('deviceready', startAirDroidServer, false);
