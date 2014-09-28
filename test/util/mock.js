var path = require('path')
  , define = require('cli-define')
  , Program = define.Program
  , base = path.normalize(path.join(__dirname, '..', '..'))
  , fixtures = path.join(base, 'test', 'fixtures')
  , target = path.join(base, 'target');

var mock = {
  opts: {
    empty: {
      input: [
        path.join(fixtures, 'empty.md'),
        path.join(fixtures, 'empty'),
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
      },
      output: path.join(target, 'simple-compiled.js'),
      //print: true
    }
  }
}

function run(opts, cb) {
  var closure = require(opts.output);
  var prg = new Program('mock');
  closure(prg, function(err, prg) {
    cb(err, prg);
  });
}

mock.run = run;

module.exports = mock;
