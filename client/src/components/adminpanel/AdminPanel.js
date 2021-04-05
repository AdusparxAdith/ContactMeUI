import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Message from './Message';
import './adminpanel.css';
import { useNotification } from '../notifications/NotificationProvider';

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const notify = useNotification();

  const getMessages = async () => {
    try {
      const result = await axios.get('/api/forms');
      setMessages(result.data);
    } catch (error) {
      notify({
        type: 'ERROR',
        message: error.message,
        title: 'Failed Request'
      });
    }
  };

  const getCSV = async () => {
    try {
      notify({
        type: 'SUCCESS',
        message: 'Fetching your CSV',
        title: 'Success Request'
      });
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
      notify({
        type: 'ERROR',
        message: error.message,
        title: 'Failed Request'
      });
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
