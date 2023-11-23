const pool = require('../DB');

async function getUserByEmail(email) {
  const client = await pool.connect();
  const sql = `select * from users where email=$1`;
  const result = (await client.query(sql, [email])).rows;
  return result;
}

async function createUserDb(name, surname, email, hashPwd) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `insert into users (name, surname, email, pwd)
          values ($1,$2,$3,$4) returning *`;
    const result = (await client.query(sql, [name, surname, email, hashPwd])).rows;
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`createUserDb:${error.message}`);
    return [];
  }
}

module.exports = { getUserByEmail, createUserDb };
