const mongoose = require('mongoose')
      Schema = mongoose.Schema;

var taskSchema = new Schema({
  name:String,
  finished: Boolean,
  importance : {
    type:String,
    enum: ['high', 'normal', 'low'],
    default : "low"
  },
  owner: {type.Schema.ObjectId, ref:"User"}
})

var Task = mongoose.model('Task', taskSchema)
module.exports = Task;
