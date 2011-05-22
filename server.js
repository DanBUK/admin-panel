var express = require('express'),
cauth= require('connect-auth'),
jade = require('jade'), 
auth = require('./lib/auth'),
encode = require('./lib/encoding'), 
md5 = require('./lib/md5'),
nodester = require('./lib/nodester-api');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(cauth(auth.auth())); // connect-auth with my custom auth
  app.use(express.logger()); // enable logger
  app.use(express.bodyParser()); // parse body
  app.use(express.methodOverride()); // ??
  app.use(express.cookieParser()); // cookie parser
  app.use(express.session({key :"ns",secret: "keyboard cat" })); // session store (NOTE cookieParser should be b4 this)
  app.use(app.router); // use the router
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var static_routing = express.static(__dirname + '/public',{ maxAge: "6000000" });

// Checks whether user has logged in
// No data store used, just plain cookie based auth
function checkAuth(req,res,next) {
  req.is_logged = false;
  // if key=>cred is present in session
  // then user is logged in
  // after verification frm nodester
  if(req.session && req.session.cred) {
    // get from session
    console.log('logged in');
    req.user = req.session.cred;
    req.is_logged = true;
  } else {
    console.log('not logged in');
  }
  next();
}

app.get("/static/*", function (req, res, next) {
  req.url = req.params[0];
  static_routing(req, res, next);
});

// Logout
app.get('/logout',checkAuth, function(req,res) {
  // check whether user is logged in ?
  // then log him out
  req.session.destroy( ); // destroy cookie session created
  res.redirect("/"); // redirect to home after delete
});

// Login
app.get('/login',checkAuth, function(req,res) {
  // check whether user is logged in ?
  // then log him out
  console.log(req.query);
  console.log(req.params);
  console.log(req.body);

  if(req.is_logged == true)
  res.redirect("/");
  else
  res.render('login', {
    title: 'Login | Nodester Admin Panel',
    is_logged: req.is_logged,
    action : req.query.action
  });
});

app.post('/login',checkAuth, function(req,res, next) {
  // check whether user is logged in ?
  // then log him out
  if(req.is_logged == true) {
    res.redirect('/');
  } else {
    // redirect back to login page, if anything is missing
    if(!req.body.user || req.body.user.user == "" && req.body.user.pass == "") {
      res.redirect("/login?action=incomplete");
      return;
    }

    // encode username and password in base64
    req.user = {
      creds:encode.base64(req.body.user.user + ":" + req.body.user.pass),
      user:req.body.user.user
    }

    // authenticate user
    req.authenticate('awesomeauth', function(err, authenticated) {
      console.log("auth it");
      if(authenticated) {
        // set session
        console.log('success');
        req.session.cred = req.user; //set session
        res.redirect("/");
      } else {
        // don`t set session
        console.log("failed");
        res.redirect("/login?action=failed");
      }
    });
  }
});

// Need to write paths to all ndoester APIs
// including GET and POST - done
// Need to figure out REGEX - done
app.all("/api/*", checkAuth, function(req, res, next){
  var params = "";
  // based on verb, get params
  if(req.is_logged === true) {
    if(req.method == "GET") {
      params = req.query;
    } else {
      params = req.body;
    }
    // method, api path, data, credentials, callback
    nodester.request(req.method, req.params[0], params, req.user.creds,function(response) {
      res.header('Content-Type', 'application/json');
      res.end(response);
    });
  } else {
    res.send('Please Login', { 'Content-Type': 'text/plain' }, 401);
  }
});

// Routes
// All routes
app.get("*", checkAuth, function(req, res){
  // give auth name
  if(req.is_logged == false)
    res.redirect("/login");
  else {
    var params = "";
    // based on verb, get params
    if(req.method == "GET") {
      params = req.query;
    } else {
      params = req.body;
    }
    
    // fix...
    req.params[0] = req.params[0].replace(/^\//,"").replace(/\/$/,"");
    var route = req.params[0];
    console.log("routes ... ", route);
    // default options
    var options = {
      options: {
        is_logged: req.is_logged,
        user: req.user.user
      }
    };
    
    function callNodesterApi(callback) {
      nodester.request(req.method, req.params[0], params, req.user.creds,function(response) {
        if(typeof(callback) == 'function') {
          callback(response);
        }
      });
    }
    
    // use switch case to decide template, other options
    switch(route) {
      case 'apps':
        callNodesterApi(function(response) {
          options["template"] = "app/index";
          options["options"]["title"] = "All Apps | Nodester Admin Panel";
          options["options"]["applist"] = JSON.parse(response);
          render();
        });
      break;
      
      case 'appdomains':
        callNodesterApi(function(response) {
          options["template"] = "appdomains/index";
          options["options"]["title"] = "Domain Aliases | Nodester Admin Panel";
          options["options"]["domainlist"] = JSON.parse(response);
          render();
        });
      break;
      
      case 'app/new':
        options["template"] = "app/new";
        render();
      break;
      
      default:
        options["template"] = "index";
        options["options"]["title"] = "Nodester Admin Panel";
        render();
      break;
    }
    
    function render() {
      // if request is xhr
      if(req.xhr) {
        options.options["layout"] = false;
        res.render(options.template, options.options, function(err, html) {
          res.header('Content-Type', 'application/json');
          res.end(JSON.stringify({status:(err ? 0 : 1),template:html}));
        });
      } else {
        // render template
        res.render(options.template, options.options);
      }
    }
  }
});

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(10049);
  console.log("Express server listening on port %d", app.address().port);
}
