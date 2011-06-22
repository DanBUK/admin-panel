var nodester_api_prefix = "app";

module.exports = {
  // Before Filters to be run
  before_filter: [
      [application.middleware.checkAuth]
    , [application.middleware.redirectFailedAuth]
    , [application.middleware.getLanguage]
  ],
  
  'show': function(req,res,next) {
    var appname = res.vars.appname = req.route.params["id"];
    application.lib.request(req.method
      , nodester_api_prefix + "/" + appname
      , {}
      , req.user.creds
      , function(response) {
    	  	res.vars.app = response;
    		  res.render("app/show");
        }
    );
  }, 
  
 'edit': function(req,res,next) {
	var appname = res.vars.appname = req.route.params["id"];
	application.lib.request(req.method
	  , nodester_api_prefix + "/" + appname
	  , {}
	  , req.user.creds
	  , function(response) {
		  res.vars.app = response;
		  res.render("app/edit");
		  }
	);
  },
  
  'new': function(req,res,next) {
		res.render("app/new", {
			layout: false
		});
  }, 
  
  'create': function(req,res,next) {
	var appname = req.body.appname;
	application.lib.request(req.method
      , nodester_api_prefix
      , req.body
      , req.user.creds
      , function(response) {
		  res.vars.app = response;
		  // fix as appname is not returned from the request
          res.vars.app.name = appname;
          // available in views: 
		  // app.name, app.status, app.port, app.gitrepo, app.start, app.running, app.pid
		  res.render("app/create", {
           layout: false
          });
        }
    );
  },
  
  'update': function(req,res,next) {
	  // res.render();
  },
  
  'delete': function(req,res,next) {
	  // res.render();
	  application.lib.request(req.method
	  , nodester_api_prefix
      , req.body
      , req.user.creds
      , function(response) {
		  res.vars.app = response;
		   res.render("app/delete", {
           layout: false
          });
        }
    );
  }
  
}