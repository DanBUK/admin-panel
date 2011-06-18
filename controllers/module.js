module.exports = {
  // Before Filters to be run
  before_filter: [
    [application.middleware.checkAuth],
    [application.middleware.getLanguage]
  ],
  
  install: function(req,res,next) {
	var params = "";
	if(req.is_logged) {
      var appname = res.vars.appname = req.route.params[0];
	  application.lib.request(req.method, "npm", params, req.user.creds, function(response) {
	  	res.vars.app = JSON.parse(response);
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.vars.app);
		res.render("app", {
			is_logged: req.is_logged,
			user: req.user.user,
			action : req.query.action,
			route: "app"
		});
	  });
    } else {
      res.redirect("/login") ;
    }
  }, 
  
  update: function(req,res,next) {
	var params = "";
	if(req.is_logged) {
      var appname = res.vars.appname = req.route.params[0];
	  application.lib.request(req.method, "npm", params, req.user.creds, function(response) {
	  	res.vars.app = JSON.parse(response);
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.vars.app);
		res.render("app", {
			is_logged: req.is_logged,
			user: req.user.user,
			action : req.query.action,
			route: "app"
		});
	  });
    } else {
      res.redirect("/login") ;
    }
  }, 
  
  uninstall: function(req,res,next) {
	var params = "";
	if(req.is_logged) {
      var appname = res.vars.appname = req.route.params[0];
	  application.lib.request(req.method, "npm", params, req.user.creds, function(response) {
	  	res.vars.app = JSON.parse(response);
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.vars.app);
		res.render("app", {
			is_logged: req.is_logged,
			user: req.user.user,
			action : req.query.action,
			route: "app"
		});
	  });
    } else {
      res.redirect("/login") ;
    }
  }
      
}