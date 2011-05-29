nodester_admin.routes.root("sites#index");

nodester_admin.routes.match("/login","sites#login");
nodester_admin.routes.match("/logout","sites#logout");