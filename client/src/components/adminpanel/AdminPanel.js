import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Message from './Message';
import './adminpanel.css';

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const result = await axios.get('/api/forms');
      setMessages(result.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const getCSV = async () => {
    try {
      const result = await axios.get('/api/forms/csv');
      const blob = new Blob([result.data], { type: 'text/csv' });
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      a.download = 'Messages.csv';
      a.href = window.URL.createObjectURL(blob);

      a.dataset.downloadurl = [{ type: 'text/csv' }, a.download, a.href].join(
        ':'
      );

      document.body.appendChild(a);
      a.click();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => getMessages(), []);
  return (
    <div className='admin-panel'>
      <div>
        <div className='admin-toolbar' onClick={() => getCSV()}>
          <i className='fas fa-arrow-circle-down'></i> DOWNLOAD CSV
        </div>
      </div>
      <div className='admin-content'>
        <div className='admin-messages'>
          {messages && messages.map((message) => <Message message={message} />)}
        </div>
        <div className='admin-hero'>
          HERE'S WHAT YOUR
          <br />
          CUSTOMERS HAVE TO SAY
        </div>
      </div>
    </div>
  );
}
