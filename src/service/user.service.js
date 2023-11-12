const {
  getAllUsersDB,
  createDataDB,
  getDataByIdDB,
  updateDataDB,
  patchDataDB
} = require("../repository/user.repository");

async function getAllUsers() {
  const data = await getAllUsersDB();
  if (!data.length) throw new Error("user data is empty");
  return data;
}

async function createData(name, surname, email, pwd) {
  const data = await createDataDB(name, surname, email, pwd);
  if (!data.length) throw new Error("user data is empty");
  return data;
}

async function getDataById(id) {
  const data = await getDataByIdDB(id);
  if (!data.length) throw new Error("user data is empty");
  return data;
}

async function updateData(id, name, surname, email, pwd) {
  const data = await updateDataDB(id, name, surname, email, pwd);
  if (!data.length) throw new Error("user data is empty");
  return data;
}

async function patchData(id, clientObj) {
  const data = await patchDataDB(id, clientObj);
if (!data.length) throw new Error("user data is empty");
  return data;
}

module.exports = {
  getAllUsers,
  createData,
  getDataById,
  updateData,
  patchData,
};
