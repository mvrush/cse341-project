/************* Prove08 Controller **************/
const fileName ='https://byui-cse.github.io/cse341-course/lesson03/items.json';

const https = require('https');
const { isUndefined } = require('util');

let contents='';
https.get(fileName,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            contents = JSON.parse(body);
        } catch (error) {
            console.error(error.message);
        };
    });
}).on("error", (error) => {
    console.error(error.message);
});

exports.getBody = (req, res, next) => {
    console.log(req.query.search);
    res.render('pages/pa08', {
      title: 'Prove Assignment 08',
      path: '/pa08', // For pug, EJS
      json: contents,
      filterMesh: contents
    });
  };

exports.postBody = (req, res, next) => {
    filterJson=contents;
    console.log(req.body);
    if(req.body.search !== undefined)
    {
    
      filterJson = contents.filter((item)=>{
      mesh= req.body.search;
      console.log(mesh);
      if(item.name.includes(mesh)||item.description.includes(mesh))
      {
        return true;
      }
      for( tag of item.tags)
      {
        if(tag.includes(mesh))
          return true;
      }
    });
    }
    res.render('pages/pa08', {
      title: 'Prove Assignment 08',
      path: '/pa08', // For pug, EJS
      json: contents,
      filterMesh: filterJson
    });
  };


