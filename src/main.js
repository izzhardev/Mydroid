import { Filesystem, Directory } from '@capacitor/filesystem';
import { WebSocketServer } from 'ws';

const startServer = () => {
  const el = document.querySelector('#app');

  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        if (data.type === 'upload') {
          await Filesystem.writeFile({
            path: data.name,
            data: data.base64,
            directory: Directory.Documents,
          });

          ws.send(JSON.stringify({
            type: 'success',
            name: data.name
          }));
        }

      } catch (err) {
        ws.send(JSON.stringify({ type: 'error' }));
      }
    });
  });

  el.innerHTML = `
    <h2>✅ Server Aktif</h2>
    <p>ws://IP_HP:8080</p>
  `;
};

document.addEventListener('deviceready', startServer);
