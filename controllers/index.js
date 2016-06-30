const express = require('express'),
      router = express.Router();


// home router
router.get('/', function(req, res) {
  res.send("To do List")
})


module.exports = router;
