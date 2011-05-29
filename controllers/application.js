function checkAuth(req,res,next) {
  req.is_logged = false;
  if(req.session && req.session.cred) {
    // get from session
    console.log('user logged in');
    req.user = req.session.cred;
    req.is_logged = true;
  }
  next();
}

nodester_admin.middleware.checkAuth = checkAuth;