import { Client } from 'pg';

export const initConnection = () => {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_HOST,
  } = process.env;
  const client = new Client({
    user: 'postgres' || 'postgres',
    host: 'localhost' || 'localhost',
    database: 'test' || 'postgres',
    password: 'postgres' || 'postgres',
    port: 5432 || 5556,
  });

  return client;
};

export const createStructure = async () => {
  const client = initConnection();
  client.connect();

  // Your code is here...

  await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(30) NOT NULL, 
      date DATE DEFAULT CURRENT_DATE
    );
  `);

  await client.query(`
    CREATE TABLE categories (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(30) NOT NULL
    );
  `);

  await client.query(`
    CREATE TABLE authors (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(30) NOT NULL
    );
  `);

  await client.query(`
    CREATE TABLE books (
      id SERIAL PRIMARY KEY, 
      title VARCHAR(30) NOT NULL, 
      userid INTEGER, 
      FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE, 
      authorid INTEGER, 
      FOREIGN KEY (authorid) REFERENCES authors(id) ON DELETE CASCADE, 
      categoryid INTEGER, 
      FOREIGN KEY (categoryid) REFERENCES categories(id) ON DELETE CASCADE
    );
  `);

  await client.query(`
    CREATE TABLE descriptions (
      id SERIAL PRIMARY KEY, 
      description VARCHAR(10000) NOT NULL, 
      bookid INTEGER UNIQUE,
      FOREIGN KEY (bookid) REFERENCES books(id) ON DELETE CASCADE
    );
  `);

  await client.query(`
    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY, 
      message VARCHAR(10000) NOT NULL, 
      userid INTEGER, 
      FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE, 
      bookid INTEGER, 
      FOREIGN KEY (bookid) REFERENCES books(id) ON DELETE CASCADE
    );
  `);

  client.end();
};

export const createItems = async () => {
  const client = initConnection();
  client.connect();

  // Your code is here...

  await client.query('INSERT INTO users (name) VALUES ($1);', ['Vasya']);

  await client.query('INSERT INTO categories (name) VALUES ($1);', ['Fiction']);

  await client.query('INSERT INTO authors (name) VALUES ($1);'['Name Surname']);

  await client.query(
    'INSERT INTO books (title, userid, authorid, categoryid) VALUES ($1, $2, $ 3, $4);',
    ['Azbuka', 1, 1, 1]
  );

  await client.query(
    'INSERT INTO descriptions (description, bookid) VALUES ($1, $2);',
    ['Lorem ipsum', 1]
  );

  await client.query(
    'INSERT INTO reviews (message, userid, bookid) VALUES ($1, $2, $3);',
    ['Lorem ipsum', 1, 1]
  );

  client.end();
};

export const dropTables = async () => {
  const client = initConnection();
  client.connect();

  await client.query('DROP TABLE reviews;');
  await client.query('DROP TABLE descriptions;');
  await client.query('DROP TABLE books;');
  await client.query('DROP TABLE authors;');
  await client.query('DROP TABLE categories;');
  await client.query('DROP TABLE users;');

  client.end();
};
