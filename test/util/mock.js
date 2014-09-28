var path = require('path')
  , define = require('cli-define')
  , Program = define.Program
  , load = require('../..').load
  , base = path.normalize(path.join(__dirname, '..', '..'))
  , fixtures = path.join(base, 'test', 'fixtures')
  , target = path.join(base, 'target');

var mock = {
  opts: {
    empty: {
      input: [
        path.join(fixtures, 'empty.md'),
      ],
      print: false
    },
    simple: {
      input: [
        path.join(fixtures, 'simple.md'),
      ],
      pkg: path.join(fixtures, 'simple-pkg.json'),
      sources: {
        configure: path.join(fixtures, 'simple-configure.js'),
        commands: path.join(fixtures, 'simple', 'commands.js'),
        options: path.join(fixtures, 'simple', 'options.js'),
      },
      output: path.join(target, 'simple-compiled.js'),
      print: true
    }
  }
}

function run(opts, cb) {
  var prg = new Program('mock');
  load(prg, opts, cb);
}

mock.run = run;

module.exports = mock;
