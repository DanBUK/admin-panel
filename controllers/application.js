/**
 * Application.js
 * Always Executed first, here you can specify middleware/functions
 * which might be reused over different controllers
 */
 
/**
 * Checks whether User is logged in
 */
function checkAuth(req,res,next) {
  req.is_logged = false;
  if(req.session && req.session.cred) {
    // get from session
    console.log('user logged in');
    req.user = req.session.cred;
    req.is_logged = true;
  }
  // broadcast state for the templates
  //res.vars.is_logged = req.is_logged;
  next();
}
 
/**
 * Gets Language
 */
function getLanguage(req,res,next) {
  res.vars = {
	  text: adminmod.lib.getLanguage("en")
  }
  next();
}

adminmod.middleware.checkAuth = checkAuth;
adminmod.middleware.getLanguage = getLanguage;