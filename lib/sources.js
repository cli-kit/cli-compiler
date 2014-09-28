var CompilerError = require('./compiler-error');

function sources(req, next) {
  var opts = req.argv
    , program = req.program
    , def = opts.def
    , sources = opts.sources;

  var options = sources.options;
  var commands = sources.commands;

  if(options) {
    try {
      def.options = require(options);
    }catch(e) {
      return next(e);
    }
  }

  if(commands) {
    try {
      def.commands = require(commands);
    }catch(e) {
      return next(e);
    }
  }

  def.options = def.options || {};
  def.commands = def.commands || {};

  next();
}

module.exports = sources;
