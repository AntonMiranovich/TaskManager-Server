const express = require("express");
const {
  getAllUsers,
  createData,
  getDataById,
  updateData,
  patchData
} = require("../service/user.service");

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const data = await getAllUsers();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.post("/", async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await createData(name, surname, email, pwd);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDataById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, pwd } = req.body;
    const data = await updateData(id, name, surname, email, pwd);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const clientObj = req.body;
    const data = await patchData(id, clientObj);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = route;
