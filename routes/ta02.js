//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

// For requirement 01 of TA02
const nameList = ['Peter','James','John'];
let message=''; // this variable erases the error messages on page reload. It has global page scope.

// For requirement 02 of TA02
router.post('/addName', (req, res, next)=>{  
  const index = nameList.indexOf(req.body.nameInput);
  console.log(index); // this line tells us the index position in the array of the inputted name in the console
  if (index > -1) {
    message = "ERROR! Name already on list!";
  }
  else {
    nameList.push(req.body.nameInput);
    message = "";
  }
  console.log("Adding "+req.body.nameInput);
  res.redirect('/ta02');
});

// Fo requirement 03 of TA02
router.post('/removeName', (req, res, next)=>{
  console.log("Removing "+req.body.nameInput);
  // Splice method removes from a const array. It's a JavaScript function
  const index = nameList.indexOf(req.body.nameInput);
  console.log(index); // this line tells us the index position in the array of the inputted name in the console
  if (index > -1) {
    nameList.splice(index, 1);
    message = "";
  }
  else {
    message = "ERROR! No user found!";
  }
  nameList.push();
  
  res.redirect('/ta02');
});

// Sets up all the variables we'll use in our view.
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