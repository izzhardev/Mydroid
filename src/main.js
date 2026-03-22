import './style.css'
import { Network } from '@capacitor/network';

const startAirDroidServer = async () => {
  const displayElement = document.querySelector('#app');
  const status = await Network.getStatus();

  if (!status.connected) {
    displayElement.innerHTML = `<h2>❌ Tidak ada koneksi jaringan</h2>`;
    return;
  }

  const httpd = window.cordova?.plugins?.CorHttpd;

  if (!httpd) {
    displayElement.innerHTML = `<h2>❌ Plugin HTTP Server tidak ditemukan</h2>`;
    return;
  }

  httpd.startServer({
    www_root: 'public', // 🔥 FIX DI SINI
    port: 8080,
    localhost_only: false
  }, (url) => {

    displayElement.innerHTML = `
      <div style="text-align:center;padding:20px">
        <h1 style="color:#4CAF50;">✅ AirDroid Mode Aktif</h1>
        <p>Buka di browser laptop:</p>

        <h2 style="background:#eee;padding:10px;border-radius:8px">
          http://${status.ipv4Address}:8080
        </h2>

        <p style="margin-top:10px;font-size:14px;color:#666">
          Pastikan HP & Laptop satu WiFi
        </p>
      </div>
    `;

  }, (err) => {
    displayElement.innerHTML = `<h2>❌ Gagal start server: ${err}</h2>`;
  });
};

document.addEventListener('deviceready', startAirDroidServer, false);
