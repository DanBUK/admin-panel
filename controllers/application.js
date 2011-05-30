function checkAuth(req,res,next) {
  req.is_logged = false;
  if(req.session && req.session.cred) {
    // get from session
    console.log('user logged in');
    req.user = req.session.cred;
    req.is_logged = true;
	
  }
  // broadcast state for the templates
	res.vars = {
		is_logged: req.is_logged
	}
  next();
}

adminmod.middleware.checkAuth = checkAuth;