function getLanguage(req,res,next) {
  res.vars = {
    text: adminmod.lib.getLanguage("en")
  }
  next();
}

module.exports = {
  // Before Filters to be run
  before_filter: [
    [adminmod.middleware.checkAuth],
    [getLanguage]
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