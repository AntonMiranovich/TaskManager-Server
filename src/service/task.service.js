const {
  getAllDataDB,
  createDataDB,
  deleteDataTaskDB,
  patchDataTaskDB,
  updateTaskByIdDB,
  getDataTaskByIdDB,
} = require('../repository/task.repository');
const ExceptionType = require('../exception/exception');

async function getAllData() {
  const data = await getAllDataDB();
  if (!data.length) throw new Error(ExceptionType.DB_GET_TASKS_NOT_FOUND);
  return data;
}

async function getDataTaskById(id) {
  const data = await getDataTaskByIdDB(id);
  if (!data.length) throw new Error(ExceptionType.DB_GET_TASK_BY_ID_NOT_FOUND);
  return data;
}

async function createData(task, user_id) {
  const data = await createDataDB(task, user_id);
  if (!data.length) throw new Error(ExceptionType.DB_POST_TASK_NOT_CREATE);
  return data;
}

async function updateTaskById(id, task, user_id) {
  const data = await updateTaskByIdDB(id, task, user_id);
  if (!data.length) throw new Error(ExceptionType.DB_PUT_TASK_NOT_UPDATE);
  return data;
}

async function deleteDataTask(id) {
  const data = await deleteDataTaskDB(id);
  if (!data.length) throw new Error(ExceptionType.DB_DELETE_TASK_NOT_DELETE);
  return data;
}

async function patchDataTask(id, clientObj) {
  const data = await patchDataTaskDB(id, clientObj);
  if (!data.length) throw new Error(ExceptionType.DB_PATCH_TASK_NOT_PATCH);
  return data;
}

module.exports = { getAllData, createData, deleteDataTask, patchDataTask, getDataTaskById, updateTaskById };
