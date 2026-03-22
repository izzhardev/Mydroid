import './style.css'
import { Network } from '@capacitor/network';

const checkConnection = async () => {
  const status = await Network.getStatus();
  const displayElement = document.querySelector('#app');

  if (status.connected) {
    // Di Capacitor terbaru, port default biasanya 8080 atau 2000
    // Tapi karena kita pakai Webview Server, coba akses port 8080
    const ip = status.ipv4Address || "192.168.43.1";
    
    displayElement.innerHTML = `
      <div class="hero">
        <h1 style="color: #4CAF50;">AirDroid Mode Aktif</h1>
        <p>Hubungkan Laptop ke Hotspot HP ini, lalu buka:</p>
        <h2 style="background: #eee; padding: 10px;">http://${ip}:8080</h2>
        <p style="font-size: 0.8rem; color: #666;">Jika gagal, coba port 2000 atau tanpa port.</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', checkConnection);
