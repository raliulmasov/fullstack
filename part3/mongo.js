//command line entries

const mongoose = require('mongoose');

// get command-line arguments
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (!password) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
}

// Connect to MongoDB
const url = `mongodb+srv://ali34:${password}@cluster0.ghswx.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
}, { collection: "people" });

const Person = mongoose.model('Person', personSchema);

// If name and number are provided, add a new entry
if (name && number) {
    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    // If only the password is provided, list all entries
    console.log("phonebook:");
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
}
