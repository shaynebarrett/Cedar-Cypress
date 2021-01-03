const express = require('express');
const router = express.Router();

//router.get("/", function(req, res) {
  //console.log ('Request for home recieved');
//res.render ('index');
//});

router.get("/documents", function(req, res) {
  console.log ('Request for documents recieved');
  res.render ('documents');
});
router.get("/blog", function(req, res) {
  console.log ('Request for blog recieved');
  res.render ('blog');
});

module.exports = router;
