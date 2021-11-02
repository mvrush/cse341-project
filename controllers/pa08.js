/************* Prove08 Controller **************/
// const fileName ='https://byui-cse.github.io/cse341-course/lesson03/items.json';

const https = require('https');
// const { isUndefined } = require('util');

const ITEMS_PER_PAGE = 10 // Limit of 10 items per page.

const renderIndex = (req, res, json) => {
  let searchedValue = req.body.searchValue || req.query.searchValue || '' // Handle for GET, POST or neither
  let page = req.query.page || 1 // Grab our page number, 1 if undefined

  const indexStart = (page - 1) * ITEMS_PER_PAGE // Item index to start on...
  const indexEnd = page * ITEMS_PER_PAGE

  const filteredData = global.jsonResponse.filter(x =>
      x.name.toLowerCase().includes(searchedValue.toLowerCase())
  )

  let stuff = {
      data: filteredData.slice(indexStart, indexEnd), // For JSON/Array and not Mongoose, .slice() works best.
      path: '/pa08',
      title: 'Prove Assignment 08',
      searchedValue: searchedValue,
      page: page,
      numPages: Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  }

  res.render('pages/pa08', stuff)
}

exports.processJson = (req, res, next) => {
  // read json
  var url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json'

  https
      .get(url, function (response) {
          var body = ''

          response.on('data', function (chunk) {
              body += chunk
          })

          response.on('end', function () {
              global.jsonResponse = JSON.parse(body)
              // Simplifying W03 rendering...
              renderIndex(req, res, global.jsonResponse)
          })
      })
      .on('error', function (e) {
          console.log('Got an error: ', e)
      })
}

// New code for W08...
exports.getIndex = (req, res, next) => {
  renderIndex(req, res, global.jsonResponse) // Render page.
}


// let contents='';
// https.get(fileName,(res) => {
//     let body = "";

//     res.on("data", (chunk) => {
//         body += chunk;
//     });

//     res.on("end", () => {
//         try {
//             contents = JSON.parse(body);
//         } catch (error) {
//             console.error(error.message);
//         };
//     });
// }).on("error", (error) => {
//     console.error(error.message);
// });

// exports.getBody = (req, res, next) => {
//     console.log("This is our req.query.search from 'getBody'", req.query.search);
//     res.render('pages/pa08', {
//       title: 'Prove Assignment 08',
//       path: '/pa08', // For pug, EJS
//       json: contents,
//       filterMesh: contents
//     });
//   }

// exports.postBody = (req, res, next) => {

//     filterJson=contents;
//     console.log(req.body);
//     if(req.body.search !== undefined)
//     {
    
//       filterJson = contents.filter((item)=>{
//       mesh= req.body.search;
//       console.log(mesh);
//       if(item.name.includes(mesh)||item.description.includes(mesh))
//       {
//         return true;
//       }
//       for( tag of item.tags)
//       {
//         if(tag.includes(mesh))
//           return true;
//       }
//     });
//     }
//     res.render('pages/pa08', {
//       title: 'Prove Assignment 08',
//       path: '/pa08', // For pug, EJS
//       json: contents,
//       filterMesh: filterJson
//     });
//   };


