import './style.css'
import { Network } from '@capacitor/network';

const startAirDroidServer = async () => {
  const status = await Network.getStatus();
  const displayElement = document.querySelector('#app');

  // MODIFIKASI: Izinkan jika terkoneksi (WiFi atau Cellular/Hotspot)
  if (status.connected) {
    const httpd = window.cordova?.plugins?.CorHttpd;

   httpd.startServer({
    'www_root': '/', // Gunakan slash tunggal
    'port': 8080,
    'localhost_only': false
}, (url) => {
    // Memperbaiki format URL agar tidak dempet (8080/desktop)
    const formattedUrl = url.endsWith('/') ? url : url + '/';
    const desktopUrl = formattedUrl + "desktop/index.html";
    
    document.querySelector('#app').innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h1 style="color: green;">Server Aktif!</h1>
            <p>Buka di Laptop:</p>
            <a href="${desktopUrl}" style="word-break: break-all;">${desktopUrl}</a>
        </div>
    `;
}, (err) => {
    alert("Gagal total: " + err);
});

}
}

document.addEventListener('deviceready', startAirDroidServer, false);
