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

module.exports = {
  // Before Filters to be run
  before_filter: [
  	[checkAuth]
  ],
  
  index: function(req,res,next) {
	var params = "";
	
      //var appname = res.vars.appname = req.route.params[0];
	  adminmod.lib.request(req.method, "appdomains", params, req.user.creds, function(response) {
	  	res.vars.appdomains = JSON.parse(response);
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.vars.appdomains);
		res.render("app", {
			is_logged: req.is_logged,
			user: req.user.user,
			action : req.query.action,
			route: "app"
		});
	  });
  }, 
  create: function(req,res,next) {
	var params = "";
	
  }, 
  delete: function(req,res,next) {
	var params = "";
	
  }
      
}