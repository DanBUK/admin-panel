nodester_admin.routes.root("sites#index");

nodester_admin.routes.match("/login","sites#login", {via:"get,post"});
nodester_admin.routes.match("/logout","sites#logout");