const pool = require('../DB');

async function getAllUsersDB() {
  const client = await pool.connect();
  const sql = `select * from users`;
  const data = (await client.query(sql)).rows;
  return data;
}

async function getDataByIdDB(id) {
  const client = await pool.connect();
  const sql = `select * from users where id=$1`;
  const data = (await client.query(sql, [id])).rows;
  return data;
}

async function createDataDB(name, surname, email, pwd) {
  const client = await pool.connect();
  try {
    await client.query('BEGEN');
    const sql = `insert into users (name, surname, email, pwd)
      values ($1,$2,$3,$4) returning *`;
    const data = (await client.query(sql, [name, surname, email, pwd])).rows;
    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`createDataDB:${error.message}`);
    return [];
  }
}

async function updateDataDB(id, name, surname, email, pwd) {
  const client = await pool.connect();
  try {
    await client.query('BEGEN');
    const sql = `update users set name=$1, surname=$2, email=$3, pwd=$4
   where id=$5 returning *`;
    const data = (await client.query(sql, [name, surname, email, pwd, id])).rows;
    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`updateDataDB:${error.message}`);
    return [];
  }
}

async function patchDataDB(id, clientObj) {
  const client = await pool.connect();
  try {
    await client.query('BEGEN');
    const sql = `select * from users where id=$1`;
    const oldObj = (await client.query(sql, [id])).rows;
    const newObj = { ...oldObj[0], ...clientObj };
    const sqlUpdate = `update users set name=$1, surname=$2, email=$3, pwd=$4
       where id=$5 returning *`;
    const result = (await client.query(sqlUpdate, [newObj.name, newObj.surname, newObj.email, newObj.pwd, id])).rows;
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`patchDataDB:${error.message}`);
    return [];
  }
}

async function deleteDataDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGEN');
    const sql = `delete from users where id=$1 returning *`;
    const result = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`deleteDataDB:${error.message}`);
    return [];
  }
}

module.exports = {
  getAllUsersDB,
  createDataDB,
  getDataByIdDB,
  updateDataDB,
  patchDataDB,
  deleteDataDB,
};
