const notes = require('express').Router();
const {readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


console.log("notes loaded");

notes.get('/', (req, res) => {readFromFile('./db/db.json').then((data) => {
    res.json(JSON.parse(data))
    });
});

notes.post('/', (req, res) => {
console.log(req.method);
console.log(req.body);

    const json = req.body;
    

    const { title, text } = json;

    if(json){
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note');
    };
});

notes.delete('/notes/:id', (req, res) => {
    res.send("deleted");
})

module.exports = notes;