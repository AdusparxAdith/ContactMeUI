import React from 'react';

export default function Message({ message: { name, message, date } }) {
  return (
    <div className='message-container'>
      <div className='message-date'>{new Date(date).toLocaleString()}</div>
      <div className='message-body'>
        <div className='message-name'>{name} </div>
        <div className='message-content'>{message}</div>
      </div>
    </div>
  );
}
