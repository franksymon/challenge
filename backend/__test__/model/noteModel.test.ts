import { db } from '../../util/database';
import { Note,NoteInterface } from '../../model/noteModel';

describe('Note Model Tests', () => {
    let createNote: NoteInterface;
    
    beforeAll(async () => {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not defined');
        }

        await db.sync({ force: true });
    });

    afterAll(async () => {
        await Note.destroy({ where: { id: createNote.id } });
        await db.close();
    });

    it('Shoul created a note', async () => {
        const testNote : Partial<NoteInterface> = {
            title: 'title',
            body: 'body',
            date: new Date(),
        };

        createNote = await Note.create(testNote);
        expect(createNote.title).toBe('title');
        expect(createNote.body).toBe('body');
    });


    it ('Shoul get a note', async () => {
        const note = await Note.findByPk(createNote.id);
        expect(note?.title).toBe('title');
        expect(note?.body).toBe('body');
    });


    it ('Shoul update a note', async () => {
        const updatedNote = await Note.update({
            title: 'updatedTitle',  
            body: 'updatedBody',
        }, {
            where: {
                id: createNote.id
            }
        });
        expect(updatedNote[0]).toBe(1);
    });


    it ('Shoul delete a note', async () => {
        const deletedNote = await Note.destroy({
            where: {
                id: createNote.id   
            }   
        });
        expect(deletedNote).toBe(1);
    });

});
