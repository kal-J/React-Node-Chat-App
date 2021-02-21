const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const fs = require('fs');
const dotenv = require('dotenv');
const validateToken = require('./utils').validateToken;

dotenv.config(); // load env variables
const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

const environment = process.env.NODE_ENV; // development

let users = fs.readFileSync(path.join(__dirname, 'db/users.json'), 'utf-8');
let rooms = fs.readFileSync(path.join(__dirname, 'db/rooms.json'), 'utf-8');

users = JSON.parse(users) || [];
rooms = JSON.parse(rooms) || {};

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chat App Bot';

const formatMessage = (sender, msg) => {
  return JSON.stringify({ sender, message: msg });
};

// Run when client connects
io.on('connection', (socket) => {
  socket.on('joinPrivateRoom', ({ user }) => {
    if (user) {
      socket.join(user.email);
      io.emit('memberList', { members: users });

      // Welcome current user
      socket.emit(
        'WelcomeMessage',
        formatMessage(botName, 'Welcome to Chat App!')
      );
      socket.on('sendPrivateMessage', ({ message, sender, receiver }) => {
        io.to(receiver).emit('privateMessage', {
          message,
          sender,
        });
      });
    }
  });

  socket.on('joinPublicRoom', ({ room, user }) => {
    if (room && user) {
      socket.join(room);

      // update room users list
      rooms[room] ? rooms[room].push(user.email) : (rooms[room] = [user.email]);
      fs.writeFile('./db/rooms.json', JSON.stringify(rooms));

      // Broadcast when a user connects
      socket.broadcast
        .to(room)
        .emit(
          'message',
          formatMessage(botName, `${user.email} has joined the chat`)
        );

      // Send users and room info
      io.to(room).emit('roomUsers', {
        room: room,
        users: rooms[room],
      });
      // Listen for chatMessage
      socket.on('chatMessage', (msg, user) => {
        io.to(room).emit('message', formatMessage(user.email, msg));
      });

      // Runs when client disconnects
      socket.on('disconnect', (user) => {
        // update room users list
        rooms[room]
          ? (rooms[room] = rooms[room].filter(
              (userEmail) => userEmail !== user.email
            ))
          : (rooms[room] = []);
        fs.writeFile('./db/rooms.json', JSON.stringify(rooms));

        io.to(room).emit(
          'message',
          formatMessage(botName, `${user.email} has left the chat`)
        );

        // Send users and room info
        io.to(room).emit('roomUsers', {
          room: room,
          users: rooms[room],
        });
      });
    }
  });
});

const routes = require('./routes/index');

app.use('/api/v1', routes(router));

// if (environment !== 'production') {
//   app.use(logger('dev'));
// }
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
