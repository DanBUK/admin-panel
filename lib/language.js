function get(req,res,next){ 

	var text = {
		"en" : { 
					"login" : { "title" : "Login | Nodester Admin Panel"
							 }, 
					"index" : { "title" : "Nodester Admin Panel"
							 }, 
					"app" : { "title" : "App | Nodester Admin Panel"
							 }
				}
		};
	
  res.vars = {
    text: text
  }
  next();
}

function set_title(req,res,next) {
  res.vars = {
    title: "Nodester Admin Panel"
  }
  next();
}

// Expose Library Methods
exports.get = get;
