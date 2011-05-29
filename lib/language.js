
function get(name){ 
	
	var str = {
		"en" : { 
					"login" : { "title" : "LOGIN"
							 }, 
					"index" : { "title" : "Nodester Admin Panel"
							 }, 
					"app" : { "title" : "App | Nodester Admin Panel"
							 }
				}
		};
	
	return str;
}

// Expose Library Methods
exports.get = get;