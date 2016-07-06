const express = require('express'),
      router = express.Router();


// home router
router.get('/', function(req, res) {
  console.log(req.user)
  res.render("index")
})


module.exports = router;
