import css from './Contacts.module.css';
import propTypes from 'prop-types';
export const Contacts = ({ findItems, deleteContactProps }) => {
  return findItems.map(({ name, number, id }) => (
    <li className={css.contact_item} key={id}>
      <span>
        &#10032; {name}: {number}
      </span>
      <button className={css.btn} onClick={deleteContactProps} id={id}>
        Видалити
      </button>
    </li>
  ));
};

Contacts.propTypes = {
  findItems: propTypes.array.isRequired,
  deleteContactProps: propTypes.func.isRequired,
};
