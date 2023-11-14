const { getAllUsersDB, createDataDB, getDataByIdDB, deleteDataDB, updateDataDB, patchDataDB } = require('../repository/user.repository');
const ExceptionType = require('../exception/exception');

async function getAllUsers() {
  const data = await getAllUsersDB();
  if (!data.length) throw new Error(ExceptionType.DB_GET_USER_NOT_FOUND);
  return data;
}

async function createData(name, surname, email, pwd) {
  const data = await createDataDB(name, surname, email, pwd);
  if (!data.length) throw new Error(ExceptionType.DB_POST_USER_NOT_CREATE);
  return data;
}

async function getDataById(id) {
  const data = await getDataByIdDB(id);
  if (!data.length) throw new Error(ExceptionType.DB_GET_USER_BY_ID_NOT_FOUND);
  return data;
}

async function updateData(id, name, surname, email, pwd) {
  const data = await updateDataDB(id, name, surname, email, pwd);
  if (!data.length) throw new Error(ExceptionType.DB_PUT_USER_NOT_UPDATE);
  return data;
}

async function patchData(id, clientObj) {
  const data = await patchDataDB(id, clientObj);
  if (!data.length) throw new Error(ExceptionType.DB_PATCH_USER_NOT_PATCH);
  return data;
}

async function deleteData(id) {
  const data = await deleteDataDB(id);
  if (!data.length) throw new Error(ExceptionType.DB_DELETE_USER_NOT_DELETE);
  return data;
}

module.exports = {
  getAllUsers,
  createData,
  getDataById,
  updateData,
  patchData,
  deleteData,
};
