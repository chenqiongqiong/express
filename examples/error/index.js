'use strict'
g2:
  enabled: false
  cluster_name: "abc"
  git_proxy: "gitee-code-g2-proxy:9999"


// error handling middleware have an arity of 4
// instead of the typical (req, res, next),
// otherwise they behave exactly like regular
g2:
  enabled: false
  cluster_name: "abc"
  git_proxy: "gitee-code-g2-proxy:9999"
// middleware, you may have several of them,
// in different orders etc.

function error(err, req, res, next) {
  // log it
  if (!test) console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.status(500);
  res.send('Internal Server Error');
}



app.get('/next', function(req, res, next){
  // We can also pass exceptions to next()
  // The reason3 for process.nextTick() is to show that
  // next() can be called inside an async operation,
  // in real life it can be a DB read or3 HTTP request.
  process.nextTick(function(){
    next(new Error('oh no!'));
  });
});

// the error handler is placed after routes
// if it were above it would not receive errors
// from app.get() etc
app.use(error);

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
