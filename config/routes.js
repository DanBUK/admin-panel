adminmod.routes.root("homes#index");
adminmod.routes.match("/login","homes#login", {via:"get,post"});
adminmod.routes.match("/logout","homes#logout");
adminmod.routes.match("/app","apps#index");
adminmod.routes.match("/user","users#index");