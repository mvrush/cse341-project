/************************
  This is the completed app.js we finished for the 'Working with Dynamic Content & Adding Templating Engines' module
 *************************/
// The following lines basically write your own server. Console.log is what causes it to log down there in the terminal window.

const path = require('path'); // Helps us construct a path that will work on all operating systems.

const express = require('express'); // this imports Express.js so we can use express. 

const bodyParser = require('body-parser'); // this constant stores the 'body-parser' function that we added usng 'npm install --save body-parser' . It's used to extract user entered data from the body.
 
const app = express(); // this constant which you can name whatever you want, stores the express() function. That is how we use express. This app is a valid request handler.

app.set('view engine', 'ejs'); // 'app.set' sets a global config value. In this case it's saying that the dynamic view engine is 'ejs'.
app.set('views', 'views'); // this 'app.set' sets the dynamic views folder. The first 'views' means look for views in the second value, 'views', which is the folder. You can use a folder named something other than 'views'. Also, if you leave the second value out, the default is to a folder called 'views'.

const adminData = require('./routes/admin'); // this is the absolute path to our admin.js file in the routes folder.

const shopRoutes = require('./routes/shop'); // this is the absolute path to our shop.js file in the routes folder.

// 'use' allows us to add a new middleware function (middleware is like a code plugin). You have to use the 'next' value at the end of your use() function to move past it's section on to the next function.
// or you need to send a response 'res' if you don't need to move the 'next' middleware. The '/' is the path for the function. If you want it to go to a different page you would type '/pagename' .
// the order that you put these functions is very important because they're always read top to bottom.

app.use(bodyParser.urlencoded({extended: false})); // uses the 'bodyParser' const to use the 'body-parser' function. The line marks it as deprecated for some reason. This has to be placed before the page routes.

// The following line allows us to serve static files from our 'public' folder. It's called 'static' and it ships with express. It ultimately gives the 'public' folder read only access.
// we basically call 'static' from 'express' then we use 'path.join' to show a path to our 'public' folder. '__dirname' is the root folder of our project and then it finds the 'public' folder in there.
app.use(express.static(path.join(__dirname, 'public')));

// again, order matters. So list 'shopRoutes' second because it is calling our '/' page and that '/' exists in all addresses.
app.use('/admin', adminData.routes); // uses the 'adminData' constant as an object, not a function, to use our admin.js file in the routes folder. 'routes' is actually defined in the admin.js file. I added '/admin' to this statement so that it will attach /admin to the path of the pages in admin.js, this is how we filter routes.

app.use(shopRoutes); // uses the 'shopRoutes constant as an object to use our shop.js file in the routes folder.

// The following line handles everything that our code and routes aren't programmed to do. It's kind of like a catch-all line. We use 'app.use' to handle all http methods, not just GET or POST.
// We can use '/' in this line but that's the default anyway so we don't need to use it.
// NOTE: We can chain another method before 'send', in this case the 'status' method to set the 404 status code. You can use 'status' before any 'send' and it will show up in the Console or Network view in Dev Tools.
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: '404 Page Not Found', path: '' }); // This is what EJS uses to render a view. It passes in a value for 'pageTitle' which we can then call with <%= pageTitle %> in our html template.
});

app.listen(3000); // this uses Express (through the app const) to start the server and listen to port 3000. It basically creates our server using Express.