import './style.css'
import { Network } from '@capacitor/network';

const startAirDroidServer = async () => {
  const status = await Network.getStatus();
  const displayElement = document.querySelector('#app');

  // MODIFIKASI: Izinkan jika terkoneksi (WiFi atau Cellular/Hotspot)
  if (status.connected) {
    const httpd = window.cordova?.plugins?.CorHttpd;

httpd.startServer({
    'www_root': 'www', // Standar folder aset Capacitor
    'port': 8080,
    'localhost_only': false
}, (url) => {
    // Tampilkan URL dasar saja dulu untuk tes
    const baseUrl = url; // misal http://10.216.6.100:8080/
    
    document.querySelector('#app').innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h1 style="color: green;">Server Connect!</h1>
            <p>Jika 404, coba klik satu per satu:</p>
            <ul style="list-style: none; padding: 0;">
                <li><a href="${baseUrl}index.html">1. Jalur Root</a></li>
                <li><a href="${baseUrl}desktop/index.html">2. Jalur Desktop</a></li>
                <li><a href="${baseUrl}public/desktop/index.html">3. Jalur Public</a></li>
            </ul>
        </div>
    `;
}, (err) => {
    alert("Gagal: " + err);
});

}
}

document.addEventListener('deviceready', startAirDroidServer, false);
