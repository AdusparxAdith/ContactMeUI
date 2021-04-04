import React from 'react';
import useForm from '../../hooks/useForm';
import './form.css';
import axios from 'axios';

export default function Form() {
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

  const [values, handleChange] = useForm({ name: '', email: '', message: '' });

  const handleSubmit = async () => {
    const { email, name, message } = values;

    if (!email || !name || !message) return alert('Please enter all fields');

    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidEmail = re.test(email);

    if (!isValidEmail) return alert('Please enter a valid email');

    try {
      await axios.post('/api/forms', values);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='contact-container'>
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
    </div>
  );
}
