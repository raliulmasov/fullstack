import React from 'react';

const Persons = ({ persons, handleDelete }) => {
    return (
        <div>
            <ul>
                {persons.map(person => (
                    <li key={person.id}>
                        {person.name}: {person.number}
                        <button className='bosluk' onClick={() => handleDelete(person.id)}>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Persons;
