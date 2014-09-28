var defmerge = require('./merge');

function walk(program, map, def) {
  var k, v;
  for(k in def) {
    v = def[k];
    if(v && map[k]) {
      defmerge(map[k], k, def[k]);
    }
  }
}

/**
 *  Join a program with source command and option definitions.
 *
 *  Sources are javascript files that define functions for
 *  the action and converter fields.
 */
function join(program, sources, cb) {
  sources = sources || {};
  var opts = sources.options
    , cmds = sources.commands;
  try {
    if(opts) opts = require(opts);
    if(cmds) cmds = require(cmds);
  }catch(e) {
    return cb(e);
  }

  walk(program, program.options(), opts);
  walk(program, program.commands(), cmds);
  cb(null, program);
}

module.exports = join;
