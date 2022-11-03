import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { ContactList } from './Contacts/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const contactsWithLocalSt = localStorage.getItem('contacts');
      return contactsWithLocalSt === null
        ? undefined
        : setContacts(JSON.parse(contactsWithLocalSt));
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleOnInputChange = e => {
    const nameInput = e.currentTarget.name;
    setFilter(e.target.value);
    if (nameInput === 'filter') {
      filterContacts();
    }
  };

  const addToContacts = (id, name, number) => {
    setContacts(prevState => [
      ...prevState,
      { id: id, name: name, number: number },
    ]);
  };

  const deleteContact = e => {
    const currentId = e.currentTarget.id;
    const newArrContacts = contacts.filter(({ id }) => currentId !== id);
    setContacts(newArrContacts);
  };

  const filterContacts = () => {
    const contactsArr = contacts;

    const contactsFindArr = contactsArr.filter(({ name }) => {
      const nameContact = name.toLowerCase();
      const nameFilter = filter.toLowerCase();
      return nameContact.includes(nameFilter);
    });
    return contactsFindArr;
  };

  return (
    <div
      style={{
        height: '100vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        display: 'block',
      }}
    >
      <Section title="Phonebook">
        <ContactForm addToContactsProps={addToContacts} items={contacts} />
      </Section>
      <Section title="Contacts">
        <ContactList
          onChangeProps={handleOnInputChange}
          findItems={filterContacts()}
          deleteContactProps={deleteContact}
        />
      </Section>
    </div>
  );
};
