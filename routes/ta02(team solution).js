//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

// For requirement 01 of TA02
const nameList = ['Peter','James','John'];
let message=''; // this variable erases the error messages on page reload. It has global page scope.

router.post('/addName', (req, res, next)=>{  
  const index = nameList.indexOf(req.body.nameInput);
  if (index > -1) {
    message = "ERROR! No Clones allowed!";
  }
  else {
    nameList.push(req.body.nameInput);
    message = "";
  }
  console.log("Adding "+req.body.nameInput);
  res.redirect('/ta02');
});
router.post('/removeName', (req, res, next)=>{
  console.log("Removing "+req.body.nameInput);
  const index = nameList.indexOf(req.body.nameInput);
  if (index > -1) {
    nameList.splice(index, 1);
    message = "";
  }
  else {
    message = "ERROR! You can't kill the dead!";
  }
  nameList.push();
  
  res.redirect('/ta02');
});

router.get('/', (req, res, next) => {
  console.log('Setup wariables');
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    nameArray: nameList,
    message: message
    });
});

module.exports = router;