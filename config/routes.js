application.routes.root("index#home");
application.routes.match("/login","index#login", {via:"get,post"});
application.routes.match("/logout","index#logout");

// resources generates the following
// resourceful routes i.e
// GET /apps -> apps.index
// GET /apps/:id -> app.show
// GET /apps/new ->  app.new
// GET /apps/:id/edit ->  app.edit
// POST /apps -> app.create
// PUT /apps/:id -> app.update
// DEL /apps/:id -> app.delete
application.routes.resources("app");

application.routes.resources("appdomain");

//adminmod.routes.match("/module/install/*","modules#install");
//adminmod.routes.match("/module/update/*","moduless#update");
//adminmod.routes.match("/module/uninstall/*","moduless#uninstall");

// GET /users/:id -> user.show
// GET /users/:id/edit ->  user.edit
application.routes.resources("user");