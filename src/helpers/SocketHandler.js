import connectSocket from 'socket.io-client';

class SocketHandler {
  socket = null;

  isListening = false;

  static init(userId = 0) {
    if (!this.socket) {
      this.socket = connectSocket(process.env.REACT_APP_SOCKET_URL);
      this.currentUserId = userId;
    }
  }

  static listen(eventName, callbackFunction) {
    if (!this.isListening) {
      this.socket.on(eventName, (data) => {
        callbackFunction(data, this.currentUserId);
      });
      this.isListening = true;
    }
  }
}

export default SocketHandler;
