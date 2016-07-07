const express = require('express'),
      router = express.Router();
      Task = require('../models/task.js')

// creates a task
router.post("/create", function (req, res) {
  var newTask = new Task({
    name : req.body.name,
    description : req.body.description,
    importance : req.body.importance,
    owner : req.user._id
  })
  newTask.save()
    .then(function(data) {
      res.send(data)
    })
})

// updates a specific task
router.post("/update", function (req,res) {
  Task.findOneAndUpdate({name:req.body.name},
    {$set:{
      name:req.body.newName,
      description:req.body.newDesc,
      importance:req.body.newImpt
    }})
      .then(function(data) {
        res.send('updated')
      })
  // using this when we are able to select tasks by _id
  // Task.findOneAndUpdate({_id:req.body._id},
  //   {$set:{name:req.body.newName, description:req.body.newDesc}})
  //     .then(function(data) {
  //       res.send(data)
  //     })
})

// deletes a specific task, will convert to deleting by task _id after
// we are able to select task _id
router.post("/delete", function (req, res) {
  Task.findOne({ name:req.body.name, owner: req.user._id })
    .then(function(data) {
      if(!data) {res.send('no such task')}
      Task.remove({_id: data._id})
        .then(function(){
          res.send('deleted')
        })
    })
})

// finds all tasks associated with user
router.post("/find", function (req, res) {
  Task.find({owner: req.user._id}).then(function(data) {
    res.send(data)
  })
})



//goes to users tasks page
router.get("/mine", function (req, res) {
  var username = req.user.username
  if(!username) {
    res.redirect('/auth/login')
  }
  res.redirect("/task/" + username)

})
// renders task page
router.get("/:username", function (req, res) {
  var username =  req.params.username
  res.render("task")
})



module.exports = router;
