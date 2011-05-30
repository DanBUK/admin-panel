adminmod.routes.root("sites#index");

adminmod.routes.match("/login","sites#login", {via:"get,post"});
adminmod.routes.match("/logout","sites#logout");