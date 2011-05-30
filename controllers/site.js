
module.exports = {
  // Before Filters to be run
  before_filter: [
    [adminmod.middleware.checkAuth],
    [adminmod.middleware.getLanguage]
  ],
  
  index: function(req,res,next) {
    if(req.is_logged) {
      console.log("logged as ", req.user);
      res.render("index", res.vars);
    } else {
      res.redirect("/login") ;
    }
  },
  
  login: function(req,res,next) {
    // If already Logged in
    if(req.is_logged) { console.log("already logged in"); res.redirect("/"); return false; }
    
    // Show Login Form
    if(req.method === "GET") {
      res.render("login", {
    is_logged: req.is_logged,
    action : req.query.action,
	route: "login"
    });
    } else if(req.method === "POST") { // On Login
      console.log('logging him in');
      // Redirect if no user | pass is input
      if(!req.body.user || req.body.user.user === "" && req.body.user.pass === "") {
        res.redirect("/login?action=incomplete");
        return;
        next();
      }
      // Set Session
      req.session.cred = {
        creds: req.body.user.user + ":" + req.body.user.pass,
        user:req.body.user.user
      }
      // Redirect to index
      res.redirect("/");
    }
  },
  
  logout: function(req,res,next) {
    console.log("logout...");
    req.session.destroy( ); // destroy cookie session created
    res.redirect("/login"); // redirect to home after delete
  }
    
}