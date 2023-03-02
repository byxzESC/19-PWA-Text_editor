import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('posting to jate database');

  const jateDb = await openDB('jate', 1);

  jateDb.transaction('jate', 'readwrite')
    .objectStore('jate')
    .add({ text: content })
    .then((result) => console.log('data saved to the database', result))
    .catch((err) => console.error('===Error===', err));
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('getting from jate database');

  const jateDb = await openDB('jate', 1);

  jateDb.transaction('jate', 'readonly')
    .objectStore('jate')
    .getAll()
    .then((result) => console.log('saved text are', result))
    .catch((err) => console.error('===Error===', err));
}

initdb();
