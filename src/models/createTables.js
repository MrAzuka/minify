import pool from './db';

const createUserTable = `CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    registered timestamptz
);`;

const runQuery = (query) => {
  pool.connect()
    .then(client => client.query(query)
      .then((res) => {
        client.release();
        console.log(`Successfully ran query: ${  query}`);
      })
      .catch((e) => {
        client.release();
        console.log(e.stack);
      }));
};

runQuery(
  `DROP TABLE IF EXISTS ${createUserTable};`
)