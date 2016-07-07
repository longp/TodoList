const Promise = require('bluebird'),
      mongoose = Promise.promisifyAll(require('mongoose'));
      Schema = mongoose.Schema;

const taskSchema = new Schema({
  name:String,
  description:String,
  finished: {
    type:Boolean,
    default: false,
  },
  importance : {
    type:String,
    enum: ['high', 'normal', 'low'],
    default : "low"
  },
  owner: {type:Schema.ObjectId, ref:"User"}
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task;
