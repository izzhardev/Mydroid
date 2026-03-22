import './style.css'
import { Network } from '@capacitor/network';

const startAirDroidServer = async () => {
  const status = await Network.getStatus();
  const displayElement = document.querySelector('#app');

  // MODIFIKASI: Izinkan jika terkoneksi (WiFi atau Cellular/Hotspot)
  if (status.connected) {
    const httpd = window.cordova?.plugins?.CorHttpd;

  httpd.startServer({
    'www_root': '', // KOSONGKAN: Ini akan memaksa server menggunakan root folder aset
    'port': 8080,
    'localhost_only': false
}, (url) => {
    // Jika berhasil, panggil folder desktop di URL
    const desktopUrl = url + "desktop/index.html";
    console.log("Akses di: " + desktopUrl);
    document.querySelector('#app').innerHTML = `<h1>Buka: ${desktopUrl}</h1>`;
}, (err) => {
    console.error("Gagal: " + err);
});

}
}

document.addEventListener('deviceready', startAirDroidServer, false);
