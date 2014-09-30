var join = require('./util/join');

/**
 *  Load a compiled program closure from disc and applies
 *  it to the target program.
 *
 *  Expects the exact options object passed to the compiler.
 *
 *  @param program The program instance.
 *  @param opts Compilation options.
 *  @param cb A callback function.
 */
function load(program, opts, cb) {
  opts = opts || {};
  var closure = require(opts.output);
  //console.dir(opts.def);
  closure(program, function ontransform(err, prg) {
    if(err) return cb(err);
    join(prg, opts, function onjoin(err, prg) {
      cb(err, prg);
    });
  });
}

module.exports = load;
