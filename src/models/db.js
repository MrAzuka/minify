import { Pool } from 'pg'
require('dotenv').config()
const {POSTGRES_USER, POSTGRES_PASSWORD} = process.env


const pool = new Pool({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: 'person_database',
    host: 'localhost',
    port: 5432
})

pool.connect()
  .then(() => console.log(`Pool connected successfully`))
  .catch(e => console.log(e.stack));

export default pool