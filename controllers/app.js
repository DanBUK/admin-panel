module.exports = {
  // Before Filters to be run
  before_filter: [
      [application.middleware.checkAuth]
    , [application.middleware.redirectAuth]
    , [application.middleware.getLanguage]
  ],
  
  show: function(req,res,next) {
    var appname = res.vars.appname = req.route.params["id"];
    application.lib.request(req.method
      , "app/" + appname
      , {}
      , req.user.creds
      , function(response) {
    	  	res.vars.app = JSON.parse(response);
    		  res.render("app/show", {
      			is_logged: req.is_logged,
      			user: req.user.user,
      			action : req.query.action,
      			route: "app/show"
      		});
        });
  }, 
  
  edit: function(req,res,next) {
	  var params = "";
		var appname = res.vars.appname = req.route.params["id"];
		application.lib.request(req.method, "app/"+appname, params, req.user.creds, function(response) {
	  		res.vars.app = JSON.parse(response);
			console.log("app: ", res.vars.app);
			res.render("app/edit", {
				is_logged: req.is_logged,
				user: req.user.user,
				action : req.query.action,
				route: "app/edit"
			});
		});
  },
  
  
  new: function(req,res,next) {
		res.render("app/new", {
			layout: false, 
			route: "app/new"
		});
  }, 
  
  create: function(req,res,next) {
	var params = req.route.params;
	if(req.is_logged) {
		application.lib.request(req.method, "app", params, req.user.creds, function(response) {
	  	res.vars.app = JSON.parse(response);
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.vars.app);
		res.render("app/create", {
			layout: false, 
			route: "app/create"
		});
	  });
	} else {
		res.redirect("/login") ;
	}
  },
  
  update: function(req,res,next) {
	  res.render();
  },
  
  destroy: function(req,res,next) {
	  res.render();
  }
  
}