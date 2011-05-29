function my_filter(req,res,next) {
  res.vars = {
    title: "Nodester Admin Panel"
  }
  next();
}

module.exports = {
  before_filter: [
    [nodester_admin.middleware.checkAuth],
    [my_filter],
  ],
  
  index: function(req,res,next) {
    
  },
  
  login: function(req,res,next) {
    console.log("login...");
    res.render("login");
  },
  
  logout: function(req,res,next) {
    console.log("logout...");
    req.session.destroy( ); // destroy cookie session created
    res.redirect("/"); // redirect to home after delete
  }
    
}