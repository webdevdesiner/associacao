import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import statusRoutes from './routes/statusRoutes';

const app = express();
const httpServer = createServer(app);

// Socket.io para chat em tempo real (uso futuro)
const io = new Server(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

app.use(cors());
app.use(express.json());

// Rotas
app.use('/', statusRoutes);

// Rota raiz também responde
app.get('/', (_req, res) => {
  res.json({ message: 'API Associação Digital - use GET /status para verificar.' });
});

const PORT = process.env.PORT || 3333;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Teste: GET http://localhost:${PORT}/status`);
});
