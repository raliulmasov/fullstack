import React from 'react';

const Filter = ({ filter, setFilter, persons }) => {
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Search by name"
            />

            <h2>Filtered Numbers</h2>
            <ul>
                {filteredPersons.map((person) => (
                    <li key={person.id}>
                        {person.name}: {person.number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;
