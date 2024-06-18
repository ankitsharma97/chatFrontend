import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import MessageInput from './MessageInput';
import withAuth from '../utils/withAuth';
import useCustomWebSocket from '../ws/Websocket';
import axios from 'axios';

function ChatArea() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const lastSentMessageRef = useRef(null);
  const [user, setUser] = useState([]);
  const BASE_URL = 'https://chatbackend-4ltq.onrender.com/';

  const { sendMessage, lastMessage, readyState } = useCustomWebSocket(chatId);

  const handleSendMessage = (text) => {
    if (text.trim() !== '' && readyState === 1) {
      sendMessage(JSON.stringify({ message: text }));
      lastSentMessageRef.current = text;

      setMessages((prevMessages) => [...prevMessages, { text, sent: true }]);
    } else {
      console.error('WebSocket is not ready or message is empty.');
    }
  };

  const getToken = localStorage.getItem('token');
  useEffect(() => {
    if (chatId && chatId !== '0') {
      const BASE_URL = 'https://chatbackend-4ltq.onrender.com/';
      axios.get(`${BASE_URL}chat/${chatId}/`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }).then((response) => {
       
        const formattedMessages = response.data.map((msg) => {
          const messageContent = JSON.parse(msg.message);
          return {
            text: messageContent.message,
            received: msg.receiver?.id === parseInt(chatId),
            sent: !(msg.sender?.id === parseInt(chatId)),
            timestamp: msg.timestamp,
          };
        });

        formattedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setMessages(formattedMessages);
      })
      .catch((error) => {
        console.error('Error fetching chat messages:', error);
      });
    }
  }, [chatId,getToken]);
  

  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = JSON.parse(lastMessage.data);
      const messageText = messageData.message;
      if (messageText !== lastSentMessageRef.current) {
        setMessages((prevMessages) => [...prevMessages, { text: messageText, sent: false }]);
      }
    }
  }, [lastMessage]);
  useEffect(() => {
    const getToken = localStorage.getItem('token');
    if (getToken && chatId && chatId !== '0') {
      axios.get(`${BASE_URL}reciver/${chatId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }).then((response) => {
        setUser(response.data);
      }
      ).catch((error) => {
        console.error('Error:', error);
      });
    }
  }
  , [chatId]);
  if (!chatId || chatId === '0') {
    return (
      <div className='text-center text-white text-xl bg-gray-800 rounded-lg p-4'>
        <h2 className='text-2xl font-bold'>Select a chat to start messaging</h2>
      </div>
    );
  }

  return (
    <div className='chat-area'>
      <div className="chat-header">
        <h4>{user.name}</h4>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            sent={msg.sent}
            received={msg.received}
          />
        ))}
      </div>
      <div className="chat-footer">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}

export default withAuth(ChatArea);
