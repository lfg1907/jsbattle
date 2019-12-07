import io from 'socket.io-client';

const ADDRESS = 'http://localhost:8000';
const socket = io.connect(ADDRESS);

export default socket;
export { ADDRESS };
