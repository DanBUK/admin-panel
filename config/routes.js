application.routes.root("index#home");
application.routes.match("/login","index#login", {via:"get,post"});
application.routes.match("/logout","index#logout");

// resources generates the following
// resourceful routes i.e
// GET /app -> apps#index
// GET /app/:id -> apps#show
// GET /app/new ->  apps#new
// GET /app/:id/edit ->  apps#edit
// POST /app -> apps#create
// PUT /app/:id -> apps#update
// DEL /app/:id -> apps#delete
application.routes.resources("app");

// adminmod.routes.match("/app/new","apps#new");
// adminmod.routes.match("/app/create","apps#create");
// adminmod.routes.match("/app/update","apps#update");
// adminmod.routes.match("/app/delete","apps#delete");
// adminmod.routes.match("/app/*","apps#index");
application.routes.resources("appdomain");

//adminmod.routes.match("/module/install/*","modules#install");
//adminmod.routes.match("/module/update/*","moduless#update");
//adminmod.routes.match("/module/uninstall/*","moduless#uninstall");
application.routes.match("/user","users#index");