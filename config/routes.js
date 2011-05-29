nodester.routes.root("apps#index");
nodester.routes.match("/test","apps#test", {via:"get"});
nodester.routes.resources("app");