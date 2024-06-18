import useWebSocket from 'react-use-websocket';

function useCustomWebSocket(chat_id) {
  const token = localStorage.getItem('token');
  const socketUrl = `wss://chatbackend-4ltq.onrender.com/ws/chat/${chat_id}/?token=${token}`;
  console.log(socketUrl);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket connection established.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onError: (error) => console.error('WebSocket error:', error),
  });

  return { sendMessage, lastMessage, readyState };
}

export default useCustomWebSocket;
