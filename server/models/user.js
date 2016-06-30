const mongoose = require('mongoose');
      Schema = mongoose.Schema;

const userSchema = new Schema ({
  username:String,
  password:String,
  role: String,
  task:[{type:Schema.Types.ObjectId, ref: "Task"}]
})

var User = mongoose.model('User', userSchema);
module.exports = User;
