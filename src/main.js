import './style.css'
import { Filesystem, Directory } from '@capacitor/filesystem';

await Filesystem.requestPermissions();
const startServer = () => {
  const el = document.querySelector('#app');
  const httpd = window.cordova?.plugins?.CorHttpd;

  if (!httpd) {
    el.innerHTML = `<h2>❌ HTTP Server tidak ditemukan</h2>`;
    return;
  }

  httpd.startServer({
    www_root: 'public',
    port: 8080,
    localhost_only: false
  }, () => {

    httpd.getURL((url) => {
      el.innerHTML = `
        <div style="padding:20px;text-align:center">
          <h2>✅ MyDroid Aktif</h2>
          <p>Buka di Laptop:</p>
          <h3>${url}desktop/index.html</h3>
        </div>
      `;
    });

  }, (err) => {
    el.innerHTML = `<h2>❌ Error: ${err}</h2>`;
  });
};

// 🔥 Fungsi menerima file dari browser
window.uploadFileToPhone = async (filename, dataUrl) => {
  const base64 = dataUrl.split(',')[1];

  await Filesystem.writeFile({
    path: filename,
    data: base64,
    directory: Directory.Documents,
  });
};

document.addEventListener('deviceready', startServer, false);
