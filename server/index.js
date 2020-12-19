import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
// import path from 'path';
import cors from 'cors';
import serverSocket from 'socket.io';
import allRoutes from './routes';
dotenv.config();
const app = express();
const basePath = '/api';
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(basePath, cors(), allRoutes);
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Imikino App' });
});
app.use((req, res) => {
  res.status(404);
  res.json({
    status: 404,
    error: 'Endpoint not found'
  });
});
const socketToListen = app.listen(port, () => {
  process.stdout.write(`Imikino App running on ${port}\n`);
});
const io = serverSocket(socketToListen);
io.sockets.on('connection', (socket) => {
  socket.on('createLocation', () => {
    socket.broadcast.emit('refreshLocation', 'Location');
  });
});
export { io };
export default app;
