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

  let fields = {
      data: filteredData.slice(indexStart, indexEnd), // For JSON/Array and not Mongoose, .slice() works best.
      path: '/pa08',
      title: 'Prove Assignment 08',
      searchedValue: searchedValue,
      page: page,
      numPages: Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  }

  res.render('pages/pa08', fields)
}

exports.pullJson = (req, res, next) => {
  // pull json from URL
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

exports.buildIndex = (req, res, next) => {
  renderIndex(req, res, global.jsonResponse) // Render page.
}




