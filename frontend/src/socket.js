import io from 'socket.io-client';

const ADDRESS = `http://localhost:${process.env.PORT}`;
const socket = io.connect(ADDRESS);

export default socket;
export { ADDRESS };
