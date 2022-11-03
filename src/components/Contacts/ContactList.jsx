import propTypes from 'prop-types';
import { Contacts } from './Contacts';
import css from './Contacts.module.css'
export const ContactList = ({ deleteContactProps, onChangeProps, findItems }) => {
  return (
    <div>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onChangeProps}
        />
      </label>
      <ul className={css.contacts_list}>
        <Contacts  findItems={findItems}
          deleteContactProps={ deleteContactProps } />
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  onChangeProps: propTypes.func.isRequired,
  findItems: propTypes.array.isRequired,
  deleteContactProps: propTypes.func.isRequired,
};