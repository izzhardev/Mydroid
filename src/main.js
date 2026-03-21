import './style.css'
import { Network } from '@capacitor/network';

// Fungsi untuk inisialisasi server
const startAirDroidServer = async () => {
  const status = await Network.getStatus();
  const displayElement = document.querySelector('#app');

  if (status.connected && status.connectionType === 'wifi') {
    const httpd = window.cordova?.plugins?.CorHttpd;

    if (httpd) {
      httpd.startServer({
        'www_root': 'desktop', // Mengarah ke folder public/desktop
        'port': 8080,
        'localhost_only': false
      }, (url) => {
        // Tampilan di Layar HP saat server sukses
        displayElement.innerHTML = `
          <div class="hero">
            <h1>AirDroid Aktif!</h1>
            <p>Buka alamat ini di browser laptop Anda:</p>
            <h2 style="color: #646cff;">http://${status.ipv4Address}:8080</h2>
            <div class="status-badge">Terhubung via ${status.connectionType}</div>
          </div>
        `;
      }, (err) => {
        displayElement.innerHTML = `<h1>Gagal Start Server: ${err}</h1>`;
      });
    } else {
      displayElement.innerHTML = `<h1>Plugin Server tidak ditemukan. Pastikan build sebagai APK.</h1>`;
    }
  } else {
    displayElement.innerHTML = `<h1>Mohon hubungkan HP ke WiFi</h1>`;
  }
}

// Jalankan saat aplikasi siap
document.addEventListener('deviceready', startAirDroidServer, false);

// Jika dijalankan di browser (untuk testing UI)
if (!window.cordova) {
  startAirDroidServer();
}
