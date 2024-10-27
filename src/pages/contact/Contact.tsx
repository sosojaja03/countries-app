import React, { ChangeEvent, useState, FormEvent } from 'react';
import styles from './contact.module.css';

interface FormErrors {
  name?: string;
  surname?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSurnameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMessageInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    if (surname.trim() === '') {
      newErrors.surname = 'Surname is required';
    }

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        name,
        surname,
        email,
        message,
      };

      console.log(formData);

      // Reset form fields after submission
      setName('');
      setSurname('');
      setEmail('');
      setMessage('');
      setErrors({});
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  console.log(`'hiii' ${Math.random()}`);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name" className={styles.label}>
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className={styles.input}
        value={name}
        onChange={handleNameInput}
      />
      {errors.name && <span className={styles.error}>{errors.name}</span>}

      <label htmlFor="surname" className={styles.label}>
        Surname
      </label>
      <input
        type="text"
        id="surname"
        name="surname"
        className={styles.input}
        value={surname}
        onChange={handleSurnameInput}
      />
      {errors.surname && <span className={styles.error}>{errors.surname}</span>}

      <label htmlFor="email" className={styles.label}>
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className={styles.input}
        value={email}
        onChange={handleEmailInput}
      />
      {errors.email && <span className={styles.error}>{errors.email}</span>}

      <label htmlFor="message" className={styles.label}>
        Message
      </label>
      <textarea
        id="message"
        name="message"
        className={styles.textarea}
        value={message}
        onChange={handleMessageInput}
      ></textarea>
      {errors.message && <span className={styles.error}>{errors.message}</span>}

      <button type="submit" className={styles.button}>
        Send
      </button>
    </form>
  );
};

export default Contact;
