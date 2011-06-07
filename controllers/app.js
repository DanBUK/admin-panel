function checkAuth(req,res,next) {
  req.is_logged = false;
  if(req.session && req.session.cred) {
    // get from session
    console.log('user logged in');
    req.user = req.session.cred;
    req.is_logged = true;
	
  }
  // broadcast state for the templates
  //res.vars.is_logged = req.is_logged;
  next();
}

function getLanguage(req,res,next) {
  res.vars = {
    text: adminmod.lib.getLanguage("en")
  }
  next();
}

module.exports = {
  // Before Filters to be run
  before_filter: [
    [checkAuth],
    [getLanguage]
  ],
  
  index: function(req,res,next) {
	var params = "";
	if(req.is_logged) {
      var appname = res.vars.appname = req.route.params[0];
	  adminmod.lib.request(req.method, "app/"+appname, params, req.user.creds, function(response) {
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
  
  new: function(req,res,next) {
		res.render("app/new", {
			layout: false, 
			route: "app/new"
		});
  }, 
  
  create: function(req,res,next) {
	var params = req.route.params;
	if(req.is_logged) {
		adminmod.lib.request(req.method, "app", params, req.user.creds, function(response) {
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
  
  delete: function(req,res,next) {
	  res.render();
  }
  
}