const express = require('express'),
      router = express.Router();
      Task = require('../models/task.js')

// router.post("/create", function (req, res) {
//   var newTask = new Task({
//     name = req.body.name,
//     description = req.body.description,
//     owner = req.user._id
//   })
//   newTask.save
// })

router.get("/", function (req, res) {
  var username = req.user.username
  if(!username) {
    res.redirect('/auth/login')
  }
  res.redirect("/tasks/" + username)

})
router.get("/:username", function (req, res) {
  var username =  req.params.username
  res.send(username)

})



module.exports = router;
