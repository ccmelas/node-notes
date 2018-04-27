const fs = require('fs');

const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'The body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
            .command('add', 'Adds a new note', {
                title: titleOptions,
                body: bodyOptions
            })
            .command('list', 'Lists all notes')
            .command('read', 'Reads a specific note', { title: titleOptions })
            .command('remove', 'Removes a specific note', {title: titleOptions})
            .help()
            .argv;
const command = argv._[0];

switch(command) {
    case 'add':
        var note = notes.addNote(argv.title, argv.body);
        if (note) {
            console.log("Note Created");
            notes.logNote(note);
        } else console.log("Duplicate Title"); 
        break;
    case 'list':
        var allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} note(s)`);
        allNotes.forEach(_note => notes.logNote(_note));
        break;
    case 'read':
        var note = notes.getNote(argv.title);
        if (note) {
            console.log('Note Retrieved');
            notes.logNote(note);
        } else {
            console.log('Note not found');
        }
        break;
    case 'remove':
        var noteRemoved = notes.removeNote(argv.title);
        var message = noteRemoved ? 'Note Removed': 'Note not found';
        console.log(message);
        break;
    default:
        console.log('Not Found');
}
// console.log(_.isString(true));
// console.log(_.isString("Melas"));
// console.log(_.uniq([1, 2, 3, 3]));
// notes.addNote(`Hello, ${user.username}. You are ${notes.age}\n`);