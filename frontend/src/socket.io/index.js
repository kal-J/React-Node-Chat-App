import { io } from 'socket.io-client';

export const connectToSocketIO = (state, setState) => {
  console.log('ENTERED SOCKETS');
  const socket = io('http://localhost:5000');

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
