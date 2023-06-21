const notes = require('express').Router();
const {readFromFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const url = require('url');


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
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note');
    };
});

const writeToFile = (destination, content) =>
  fs.writeFileSync(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

notes.delete('/:id', (req, res) => {
    console.log(req.params.id);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            for (let i = 0; i < parsedData.length; i++){
                if(parsedData[i].id === req.params.id){
                    parsedData.splice(i, 1);
                };
                writeToFile('./db/db.json', parsedData);
            };
            res.send("note deleted");
        };
    });
})

module.exports = notes;