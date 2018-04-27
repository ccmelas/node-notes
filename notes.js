const fs = require('fs');

const fetchNotes = () => {
    var notes = [];
    try {
        notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    } catch(e) { notes = [] }

    return notes;
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const addNote = (title, body) => {
    let notes = fetchNotes();
    const note = {title, body};
    
    var duplicate = notes.find(_note => _note.title === note.title);
    
    if (duplicate) {
        return;
    }
    notes.push(note);
    saveNotes(notes);

    return note;
};

const getAll = () => {
    return fetchNotes();
}

const getNote = (title) => {
    return fetchNotes().filter(_note => _note.title === title)[0];
}

const removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(_note => _note.title !== title);
    saveNotes(filteredNotes);
    
    return notes.length !== filteredNotes.length;
}

const logNote = (note) => {
    console.log('---------------');
    console.log(`Title:\t${note.title}`);
    console.log(`Body:\t${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}