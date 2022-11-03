import propTypes from 'prop-types';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const ContactForm = ({ addToContactsProps, items }) => {
  const [nameHook, setNameHook] = useState('');
  const [number, setNumber] = useState('');

  const handleOnInputChange = e => {
    const inputName = e.target.name;
    switch (inputName) {
      case 'name':
        setNameHook(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        console.log('Sorry, we are out of ' + inputName + '.');
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    let presenceContact = false;

    items.map(({ name }) => {
      if (name === nameHook) {
        e.currentTarget.name.value = '';
        e.currentTarget.number.value = '';
        presenceContact = true;
        return alert(`${name} is already in contacts`);
      } else {
        return null;
      }
    });

    if (!presenceContact) {
      setNameHook(e.currentTarget.name.value);
      setNumber(e.currentTarget.number.value);

      addToContactsProps(nanoid(), nameHook, number);

      e.currentTarget.name.value = '';
      e.currentTarget.number.value = '';
    }
  };
  return (
    <div className={css.form}>
      <form onSubmit={handleOnSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleOnInputChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleOnInputChange}
          />
        </label>

        <button className={css.btn} type="submit">
          Add contacts
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  addToContactsProps: propTypes.func.isRequired,
  items: propTypes.array.isRequired,
};
