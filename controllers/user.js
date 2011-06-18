module.exports = {
  // Before Filters to be run
  before_filter: [
      [application.middleware.checkAuth]
    , [application.middleware.redirectFailedAuth]
    , [application.middleware.getLanguage]
  ],
  
  index: function(req,res,next) {
    if(req.is_logged) {
      console.log("logged as ", req.user);
      res.render("index");
    } else {
      res.redirect("/login") ;
    }
  }
      
}