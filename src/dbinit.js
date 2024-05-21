import { Pool } from 'pg';
import { Users, Products, Orders, Items, Transactions } from './schema';

const pool = new Pool({
  connectionString: 'postgres://lio:1234@localhost/ecommerce',
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(Users);
    await client.query(Products);
    await client.query(Orders);
    await client.query(Items);
    await client.query(Transactions);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

createTables()
  .then(() => console.log('Tables created'))
  .catch((e) => console.error('Failed to create tables', e.message));
