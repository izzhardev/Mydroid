import './style.css'
import { Network } from '@capacitor/network';

const startAirDroidServer = async () => {
  const status = await Network.getStatus();
  const displayElement = document.querySelector('#app');

  if (status.connected) {
    const httpd = window.cordova?.plugins?.CorHttpd;

    if (httpd) {
      // Taktik: Kosongkan www_root agar plugin mencari otomatis
      httpd.startServer({
        'www_root': '', 
        'port': 8080,
        'localhost_only': false
      }, (url) => {
        // Jika berhasil, biasanya url akan menunjuk ke root aset
        displayElement.innerHTML = `
          <div class="hero">
            <h1 style="color: #4CAF50;">AirDroid Online!</h1>
            <p>Buka di Browser Laptop:</p>
            <h2 style="background: #eee; padding: 10px;">http://${status.ipv4Address}:8080/index.html</h2>
            <p>Jika Error 404, coba: http://${status.ipv4Address}:8080/desktop/index.html</p>
          </div>
        `;
      }, (err) => {
        displayElement.innerHTML = `<h1>Gagal: ${err}</h1>`;
      });
    }
  }
}

document.addEventListener('deviceready', startAirDroidServer, false);
