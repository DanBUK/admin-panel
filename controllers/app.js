var apps = [0,0,1];

function my_filter(req,res,next) {
  res.vars = {
    title: "hello"
  }
  console.log('filter 1')
  next();
}

function my_filter2(req,res,next) {
  console.log('filter 2')
  next();
}

function my_filter3(req,res,next) {
  console.log('filter 3')
  next();
}

module.exports = {
  before_filter: [
    [my_filter],
    [my_filter2, {only: "test"}],
    [my_filter3, {except: "test"}]
  ],
  
  index: function(req,res,next) {
    console.log("here =>")
    res.render(apps)
  },
  
  show: function(req,res,next) {
    console.log("show" + req.params.id);
    var app = apps[req.params.id];
    res.render(app);
  },
  
  test: function(req,res,next) {
    console.log("test");
    res.render("test", {
      title: "my own title"
    });
  }
  
}