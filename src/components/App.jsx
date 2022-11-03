// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { ContactList } from './Contacts/ContactList';
// import { useEffect } from 'react';

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

// export class App2 extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };
//   componentDidMount = prevState => {
//     try {
//       const contactsWithLocalSt = localStorage.getItem('contacts');
//       return contactsWithLocalSt === null
//         ? localStorage.setItem('contacts', JSON.stringify([]))
//         : this.setState({ contacts: JSON.parse(contactsWithLocalSt) });
//     } catch (error) {
//       console.error('Get state error: ', error.message);
//     }
//   };
//   componentDidUpdate = prevState => {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   };

//   handleOnInputChange = e => {
//     const nameInput = e.currentTarget.name;
//     this.setState({ [nameInput]: e.target.value });

//     if (nameInput === 'filter') {
//       this.filterContacts();
//     }
//   };

//   addToContacts = (name, number, id) => {
//     this.setState(prevState => {
//       return {
//         contacts: [
//           ...prevState.contacts,
//           { name: name, number: number, id: id },
//         ],
//       };
//     });
//   };
//   deleteContact = e => {
//     const currentId = e.currentTarget.id;
//     const newArrContacts = this.state.contacts.filter(
//       ({ id }) => currentId !== id
//     );
//     this.setState({ contacts: newArrContacts });
//   };

//   filterContacts = () => {
//     const contactsArr = this.state.contacts;

//     const contactsFindArr = contactsArr.filter(({ name }) => {
//       const nameContact = name.toLowerCase();
//       const nameFilter = this.state.filter.toLowerCase();
//       return nameContact.includes(nameFilter);
//     });
//     return contactsFindArr;
//   };

//   render() {
//     return (
//       <div
//         style={{
//           height: '100vh',
//           // display: 'flex',
//           // justifyContent: 'center',
//           // alignItems: 'center',
//           fontSize: 40,
//           color: '#010101',
//           display: 'block',
//         }}
//       >
//         <Section title="Phonebook">
//           <ContactForm
//             addToContactsProps={this.addToContacts}
//             items={this.state.contacts}
//           />
//         </Section>
//         <Section title="Contacts">
//           <ContactList
//             onChangeProps={this.handleOnInputChange}
//             findItems={this.filterContacts()}
//             deleteContactProps={this.deleteContact}
//           />
//         </Section>
//       </div>
//     );
//   }
// }
