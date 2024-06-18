// Message.js
import React from 'react';

function Message({ text, sent, received }) {
  return (
    <div className={`message ${sent ? 'sent' : 'received'}`}>
      <div className="message-bubble">
        {text}  
      </div>
    </div>
  );
}

export default Message;
