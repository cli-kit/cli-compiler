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
  var closure = require(opts.output);
  closure(program, function(err, prg) {
    cb(err, prg);
  });
}

module.exports = load;
