adminmod.routes.root("indexs#home");
adminmod.routes.match("/login","indexs#login", {via:"get,post"});
adminmod.routes.match("/logout","indexs#logout");

// resources generates the following
// resourceful routes i.e
// GET /app -> apps#index
// GET /app/:id -> apps#show
// GET /app/new ->  apps#new
// GET /app/:id/edit ->  apps#edit
// POST /app -> apps#create
// PUT /app/:id -> apps#update
// DEL /app/:id -> apps#delete
adminmod.routes.resources("app");

// adminmod.routes.match("/app/new","apps#new");
// adminmod.routes.match("/app/create","apps#create");
// adminmod.routes.match("/app/update","apps#update");
// adminmod.routes.match("/app/delete","apps#delete");
// adminmod.routes.match("/app/*","apps#index");
adminmod.routes.match("/appdomains","appdomains#index");
adminmod.routes.match("/appdomain/create","appdomains#create");
adminmod.routes.match("/appdomain/delete","appdomains#delete");
//adminmod.routes.match("/module/install/*","modules#install");
//adminmod.routes.match("/module/update/*","moduless#update");
//adminmod.routes.match("/module/uninstall/*","moduless#uninstall");
adminmod.routes.match("/user","users#index");