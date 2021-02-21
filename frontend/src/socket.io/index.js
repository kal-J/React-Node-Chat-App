import { io } from 'socket.io-client';

export const connectToSocketIO = (state, setState) => {
  console.log('ENTERED SOCKETS');
  const socket = io('https://lan-chat-app.herokuapp.com');

  socket.on('connect', () => {
    console.log('SOCKET ID', socket.id);
    console.log('user', state.user);
    socket.emit('joinPrivateRoom', { user: state.user });

    socket.on('memberList', ({ members }) => {
      console.log('Members', members);
      setState({ ...state, members });
    });
  });
};
