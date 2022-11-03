import css from './Contacts.module.css'
import propTypes from 'prop-types';
export const Contacts = ({ findItems, deleteContactProps }) => {
  // if (findItems.length > 0) {
  console.log()
    return findItems.map(({ name, number, id, }) => (
      <li className={css.contact_item} key={id}>
        <span>&#10032; {name}: {number}</span>
        <button className={css.btn} onClick={deleteContactProps} id={id}>Видалити</button>
      </li>
    ));
  // }
  // return items.map(({ name, number, id }) => (
  //   //  if(name === name){}
  //   <li key={id}>
  //     <p>
  //       {name}: {number}
  //     </p>

  //     {/* <button>Видалити</button> */}
  //   </li>
  // ));
};

Contacts.propTypes = {
  findItems: propTypes.array.isRequired,
  deleteContactProps: propTypes.func.isRequired,
};
