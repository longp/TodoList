const express = require('express'),
      router = express.Router();
      Task = require('../models/task.js')

router.post("/create", function (req, res) {
  var newTask = new Task({
    name = req.body.name,
    description = req.body.description,
    owner = req.user._id
  })
  newTask.save
})
