var fs = require('fs')
  , load = require('./load');

function cache(req, next) {
  var opts = req.argv
    , program = req.program
    , loads = opts.output && opts.cache !== false;
  if(loads) {
    return fs.exists(opts.output, function(exists) {
      if(!exists) return next();
      //console.log('loading cached program %s', opts.output);
      load(program, opts, function(err, prg) {
        if(err) return next(err);
        req.cache = {
          file: opts.output
        }
        req.complete();
      })
    });
  }
  next();
}

module.exports = cache;
