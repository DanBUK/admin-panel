adminmod.routes.root("indexs#home");
adminmod.routes.match("/login","indexs#login", {via:"get,post"});
adminmod.routes.match("/logout","indexs#logout");
adminmod.routes.match("/app/*","apps#index");
adminmod.routes.match("/appdomains","appdomains#index");
adminmod.routes.match("/appdomain/create","appdomains#create");
adminmod.routes.match("/appdomain/delete","appdomains#delete");
adminmod.routes.match("/user","users#index");
