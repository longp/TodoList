const mongoose =(require('mongoose');
      Schema = mongoose.Schema;

const taskSchema = new Schema({
  name:String,
  description:String,
  finished: Boolean,
  importance : {
    type:String,
    enum: ['high', 'normal', 'low'],
    default : "low"
  },
  owner: {type.Schema.ObjectId, ref:"User"}
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task;
