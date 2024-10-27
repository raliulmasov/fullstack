import { useState, useEffect } from 'react';
import "./index.css"
import "./App.css";
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import { getPersons, addPerson, deletePerson, updatePerson } from './services/service';
import Warning from './components/Warning';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [isNewContactAdded, setIsNewContactAdded] = useState(false);
  const [message, setMessage] = useState("");
  const [warningType, setWarningType] = useState('');


  useEffect(() => {
    getPersons().then(setPersons);
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (isNewContactAdded) {
      const timer = setTimeout(() => {
        setIsNewContactAdded(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isNewContactAdded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newName || !number) {
      alert("Both name and number are required");
      return;
    }

    const existingPerson = persons.find(p => p.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added. Update number?`)) {
        const updatedPerson = { ...existingPerson, number };
        try {
          await updatePerson(existingPerson.id, updatedPerson);
          setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p));
          setMessage(`${newName}'s number was updated`);
        } catch (error) {
          setMessage(`Failed to update ${newName}'s number`);
          setWarningType("error")
        }
      }
    } else {
      try {
        const newPerson = await addPerson({ name: newName, number });
        setPersons([...persons, newPerson]);
        setIsNewContactAdded(true);
        setMessage(`${newName} was added`);
        setWarningType("warning")
      } catch (error) {
        setMessage(`Failed to add ${newName}`);
        setWarningType("error")
      }
    }

    setNewName('');
    setNewNumber('');
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete contact?")) {
      try {
        await deletePerson(id);
        setPersons(persons.filter(p => p.id !== id));
      } catch (error) {
        alert('Failed to delete contact.');
      }
    }
  };

  return (
    <div className='container'>
      <h1>Phonebook</h1>
      <Warning message={message} type={warningType} />
      <Form handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} number={number} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />
      <Filter filter={filter} setFilter={setFilter} persons={persons} />
    </div>
  );
};

export default App;
