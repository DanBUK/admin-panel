module.exports = {
  // Before Filters to be run
  before_filter: [
  	[application.middleware.checkAuth]
  ],
  
  index: function(req,res,next) {
	  application.lib.request(req.method
	    , "appdomains"
	    , params
	    , req.user.creds
	    , function(response) {
	    	  res.vars.appdomains = response;
  		    res.render("app", {
      			is_logged: req.is_logged,
      			user: req.user.user,
      			action : req.query.action,
      			route: "app"
      		});
	  });
  }, 
  
  
  create: function(req,res,next) {
  }, 
  
  destroy: function(req,res,next) {
  }    
}