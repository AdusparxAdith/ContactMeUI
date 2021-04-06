import React, { Fragment, useState } from 'react';
import useForm from '../../hooks/useForm';
import './form.css';
import axios from 'axios';
import { useNotification } from '../notifications/NotificationProvider';

export default function Form() {
  const notify = useNotification();
  const [submitted, setSubmitted] = useState(false);

  const inputs = [
    {
      label: 'full name',
      placeholder: 'Jhon Doe',
      type: 'text',
      id: 'name'
    },
    {
      label: 'email',
      placeholder: 'jhondoe@example.com',
      type: 'email',
      id: 'email'
    },
    {
      label: 'message',
      placeholder: 'Sample message',
      type: 'textarea',
      id: 'message'
    }
  ];

  const [values, handleChange, clearForm] = useForm({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async () => {
    const { email, name, message } = values;

    if (!email || !name || !message)
      return notify({
        type: 'ERROR',
        message: 'Please enter all fields',
        title: 'Failed Request'
      });

    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidEmail = re.test(email);

    if (!isValidEmail)
      return notify({
        type: 'ERROR',
        message: 'Please enter a valid email',
        title: 'Failed Request'
      });

    try {
      await axios.post('/api/forms', values);
      notify({
        type: 'SUCCESS',
        message: 'Submitted you response!',
        title: 'Successful Request'
      });
      setSubmitted(true);
      clearForm();
    } catch (error) {
      const { message } = error.response.data;
      notify({
        type: 'ERROR',
        message: message || error.message,
        title: 'Failed Request'
      });
    }
  };

  return (
    <div className='contact-container'>
      {!submitted ? (
        <div className='contact-form'>
          <div className='contact-layout'>
            <h2>
              send us a<br /> message
            </h2>
            {inputs.map((input) => (
              <div key={input.id} className='contact-form-container'>
                <label className='contact-form-label' htmlFor={input.id}>
                  {input.label}
                </label>
                {input.type === 'textarea' ? (
                  <textarea
                    className='contact-form-input'
                    type={input.type}
                    id={input.id}
                    name={input.id}
                    placeholder={input.placeholder}
                    value={values[input.id]}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    className='contact-form-input'
                    type={input.type}
                    id={input.id}
                    name={input.id}
                    placeholder={input.placeholder}
                    value={values[input.id]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}

            <button
              className='contact-form-button'
              onClick={() => handleSubmit()}
            >
              send <i className='far fa-paper-plane'></i>
            </button>
          </div>
        </div>
      ) : (
        <div className='form-hero'>
          Thanks,
          <br /> We've recorded your response.
        </div>
      )}
    </div>
  );
}
