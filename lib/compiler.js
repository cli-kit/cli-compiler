var middleware = require('cli-middleware')
  , CompilerError = require('./compiler-error');

//process.env.

var list = [
  require('./create'),
  require('./libs'),
  require('./sources'),
  require('./cat'),
  require('./parse'),
  require('./render'),
  require('./replace'),
]

function compile(opts, cb) {
  opts = opts || {};

  // library module function to invoke in the scope of the program
  opts.libs = opts.libs || [];

  // source paths for option and command definitions to merge
  opts.sources = opts.sources || {};

  // definitions to merge with the parsed program data
  opts.def = {};

  opts.input = Array.isArray(opts.input) ? opts.input
    : opts.input ? [opts.input] : null;

  if(!opts.input || !opts.input.length) {
    return cb(new CompilerError('no input files specified'));
  }

  var midopts = {list: list, bail: true}
    , runner = middleware(midopts)
    , req = {};
  runner(opts, req, function oncomplete(req, err) {
    cb(err, req);
  });
}

module.exports = compile;
