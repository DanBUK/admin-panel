module.exports = {
  // Before Filters to be run
  before_filter: [
  	[adminmod.middleware.checkAuth]
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