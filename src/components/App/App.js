import { Component } from 'react';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Contacts, Layout, Title } from './App..styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = values => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    const { contacts } = this.state;

    if (contacts.find(contact => contact.name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };
  filterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const normalize = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalize)
    );
    return (
      <Layout>
        <Title>Phonebook</Title>
        <ContactForm onFormSubmit={this.addContact} />
        <Contacts>Contacts</Contacts>
        <Filter value={filter} onChange={this.filterChange} />
        <ContactList filters={filterContacts} onDelete={this.deleteContact} />
      </Layout>
    );
  }
}
