import http from 'node:http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3001;
const origins = (process.env.CLIENT_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
const corsOrigin = origins.length ? origins : false;

const app = express();
app.use(cors({ origin: corsOrigin }));

const startedAt = Date.now();
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptimeSec: Math.round((Date.now() - startedAt) / 1000),
    connections: io.engine.clientsCount,
    time: new Date().toISOString(),
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: corsOrigin, methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  // Этап 3+: комнаты, лобби и игровые события подключаются здесь.
  socket.on('disconnect', () => {});
});

server.listen(PORT, () => console.log(`BLUFF server on :${PORT}`));
