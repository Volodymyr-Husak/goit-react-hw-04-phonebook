import propTypes from 'prop-types';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { Component } from 'react';
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleOnInputChange = e => {
    const nameInput = e.currentTarget.name;
    this.setState({ [nameInput]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    let presenceContact = false;

    this.props.items.map(({ name }) => {
      if (name === this.state.name) {
        e.currentTarget.name.value = '';
        e.currentTarget.number.value = '';
        presenceContact = true;
        return alert(`${name} is already in contacts`);
      } else {
        return null;
      }      
    });

    if (!presenceContact) {
      const nameInput = e.currentTarget.name;

      this.setState({ [nameInput]: e.target.value });

      this.props.addToContactsProps(
        this.state.name,
        this.state.number,
        nanoid()
      );

      e.currentTarget.name.value = '';
      e.currentTarget.number.value = '';
    }
  };

  render() {
    return (
      <div className={css.form}>
        <form onSubmit={this.handleOnSubmit}>
          <label>
            Name
            <input 
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleOnInputChange}
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
              onChange={this.handleOnInputChange}
            />
          </label>

          <button className={css.btn} type="submit">
            Add contacts
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  addToContactsProps: propTypes.func.isRequired,
  items: propTypes.array.isRequired,
};