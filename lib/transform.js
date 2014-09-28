var path = require('path')
  , fs = require('fs')
  , esprima = require('esprima')
  , escodegen = require('escodegen');

/**
 *  Get the transformer document ast.
 */
function transformer(cb) {
  var mod = path.join(__dirname, 'transformer.js');
  fs.readFile(mod, function(err, contents) {
    cb(err, contents ? esprima.parse('' + contents) : contents);
  })
}

/**
 *  Convert the ast to a javascript string.
 */
function stringify(ast, cb) {
  var js;
  try {
    js = escodegen.generate(ast);
  }catch(e) {
    return cb(e);
  }
  cb(null, js);
}

function transform(req, next) {
  var opts = req.argv
    , program = req.program;
  transformer(function(err, ast) {
    if(err) return next(err);
    //console.dir(ast);
    stringify(ast, function(err, js) {
      //console.dir(js);
      req.js = js;
      next();
    });
  });
}

module.exports = transform;
