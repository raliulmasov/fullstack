import React from 'react';

const Form = ({ handleSubmit, newName, setNewName, number, setNewNumber }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter name"
                />
            </div>
            <div>
                <label htmlFor="number">Number:</label>
                <input
                    id="number"
                    type="text"
                    value={number}
                    onChange={(e) => setNewNumber(e.target.value)}
                    placeholder="Enter phone number"
                />
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default Form;
