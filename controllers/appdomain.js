module.exports = {
  // Before Filters to be run
  before_filter: [
      [application.middleware.checkAuth]
    , [application.middleware.redirectFailedAuth]
    , [application.middleware.getLanguage]
  ],
  
  index: function(req,res,next) {
	  application.lib.request(req.method
	    , "appdomains"
	    , params
	    , req.user.creds
	    , function(response) {
	    	  res.vars.appdomains = response;
  		    res.render("app");
	  });
  }, 
  
  
  create: function(req,res,next) {
  }, 
  
  destroy: function(req,res,next) {
  }    
}