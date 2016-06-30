const express = require('express'),
      router = express.Router();


// home router
router.get('/', function(req, res) {
  res.render("index")
})


module.exports = router;
