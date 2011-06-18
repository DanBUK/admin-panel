function getGravatar(req,res,next) {
  /*if(req.user.email != undefined){
  	// when this becomes dynamic first convert the email string to lower case .toLowerCase()
  	var email_hash = application.lib.md5( req.user.email );
  	res.vars.gravatar = "http://www.gravatar.com/avatar/"+email_hash;
  } else {*/
	// revert to a default image
  	res.vars.gravatar = "/static/img/gravatar-48.png";
  //}
  next();
}

module.exports = {
  // Before Filters to be run
  before_filter: [
      [application.middleware.checkAuth]
    , [application.middleware.redirectAuth, {only: "home"}]
    , [application.middleware.getLanguage]
    , [getGravatar]
  ],
  
  home: function(req,res,next) {
    console.log("logged as ", req.user);
		// Request Nodester for Apps List
	  application.lib.request(req.method
	    , "apps"
	    , {}
	    , req.user.creds
	    , function(response) {
	  	    res.vars.applist = JSON.parse(response);
    		  res.render("home");
    });
  },
  
  login: function(req,res,next) {
    // If already Logged in
    if(req.is_logged) { 
      console.log("already logged in"); 
      res.redirect("/"); 
      return false; 
    }
    
    // Show Login Form
    if(req.method === "GET") {
      res.render("login");
    } else if(req.method === "POST") { // On Login
      // Validate Input Fields
      if(!req.body.user 
        || req.body.user.user === "" 
        && req.body.user.pass === "") {
        res.redirect("/login?action=incomplete");
        return;
        next();
      }
      // Set Session so he can be authorized and logged in
      req.session.cred = {
          creds: req.body.user.user + ":" + req.body.user.pass
        , user:req.body.user.user
      }
      // Redirect to index
      res.redirect("/");
    }
  },
  
  logout: function(req,res,next) {
    // If already Logged in
    if(!req.is_logged) { 
      console.log("already logged out in"); 
      res.redirect("/"); 
      return false; 
    }
    req.session.destroy(); // destroy cookie session created
    res.redirect("/login"); // redirect to home after delete
  }
    
}