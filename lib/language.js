
function get(name){ 

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
	
	return text["en"];
}

// Expose Library Methods
exports.get = get;