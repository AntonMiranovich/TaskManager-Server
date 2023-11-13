const express = require('express');
const { getAllData, createData, deleteDataTask, patchDataTask } = require('../service/task.service');
const buildResponse = require('../helper/builResponse');
const { isValidTaskBody, isValidId } = require('../helper/validation');

const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const data = await getAllData();
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post('/', isValidTaskBody, async (req, res) => {
  try {
    const { task, user_id } = req.body;
    const data = await createData(task, user_id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.delete('/:id', isValidId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteDataTask(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.patch('/:id', isValidId, async (req, res) => {
  try {
    const { id } = req.params;
    const clientObj = req.body;
    const data = await patchDataTask(id, clientObj);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
