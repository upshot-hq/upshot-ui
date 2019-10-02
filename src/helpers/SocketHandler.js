import connectSocket from 'socket.io-client';

class SocketHandler {
  constructor(userId = 0) {
    this.socket = connectSocket(process.env.REACT_APP_SOCKET_URL);
    this.currentUserId = userId;
  }

  listen(eventName, callbackFunction) {
    this.socket.on(eventName, (data) => {
      callbackFunction(data, this.currentUserId);
    });
  }
}

export default SocketHandler;
