import React from "react";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Use e.target to access form data
    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      surname: (form.elements.namedItem("surname") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    console.log(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name" className={styles.label}>
        Name
      </label>
      <input type="text" id="name" name="name" className={styles.input} />

      <label htmlFor="surname" className={styles.label}>
        Surname
      </label>
      <input type="text" id="surname" name="surname" className={styles.input} />

      <label htmlFor="email" className={styles.label}>
        Email
      </label>
      <input type="email" id="email" name="email" className={styles.input} />

      <label htmlFor="message" className={styles.label}>
        Message
      </label>
      <textarea
        id="message"
        name="message"
        className={styles.textarea}
      ></textarea>

      <button type="submit" className={styles.button}>
        Send
      </button>
    </form>
  );
};

export default Contact;
