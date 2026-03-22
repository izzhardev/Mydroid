import './style.css'
import { Network } from '@capacitor/network';

const startAirDroidServer = async () => {
  const status = await Network.getStatus();
  const displayElement = document.querySelector('#app');

  // MODIFIKASI: Izinkan jika terkoneksi (WiFi atau Cellular/Hotspot)
  if (status.connected) {
    const httpd = window.cordova?.plugins?.CorHttpd;

    if (httpd) {
      httpd.startServer({
        'www_root': 'www/desktop',
        'port': 8080,
        'localhost_only': false 
      }, (url) => {
        // Kita coba ambil IP Address asli untuk ditampilkan
        // Jika ipv4Address tidak muncul, kita beri instruksi cek manual
        const ipManual = status.ipv4Address || "IP Hotspot Anda";
        
        displayElement.innerHTML = `
          <div class="hero">
            <h1 style="color: #4CAF50;">AirDroid Aktif!</h1>
            <p>Mode: ${status.connectionType === 'wifi' ? 'WiFi' : 'Hotspot/Data'}</p>
            <hr>
            <p>Buka alamat ini di browser laptop:</p>
            <h2 style="color: #646cff; background: #eee; padding: 10px;">http://${ipManual}:8080</h2>
            <p style="font-size: 0.8rem;">Pastikan Laptop terhubung ke Hotspot HP ini.</p>
          </div>
        `;
      }, (err) => {
        displayElement.innerHTML = `<h1>Gagal Start Server: ${err}</h1>`;
      });
    } else {
      displayElement.innerHTML = `<h1>Plugin Server Tidak Aktif.</h1>`;
    }
  } else {
    displayElement.innerHTML = `<h1>HP Tidak Terkoneksi Jaringan</h1>`;
  }
}

document.addEventListener('deviceready', startAirDroidServer, false);
