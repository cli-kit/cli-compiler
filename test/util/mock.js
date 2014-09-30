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
    basic: {
      name: 'basic-program',
      version: '1.0.0',
      description: 'A *basic* program description',
      input: [
        path.join(fixtures, 'basic.md'),
      ],
      output: path.join(target, 'basic-compiled.js'),
      print: false
    },
    replace: {
      input: [
        path.join(fixtures, 'replace.md'),
      ],
      output: path.join(target, 'replace-compiled.js'),
      print: false
    },
    definition: {
      input: [
        path.join(fixtures, 'definition.md'),
      ],
      definition: {
        options: require('../fixtures/def/options'),
        commands: require('../fixtures/def/commands')
      },
      output: path.join(target, 'definition-compiled.js'),
      print: true
    },
    simple: {
      input: [
        path.join(fixtures, 'simple.md'),
      ],
      pkg: path.join(fixtures, 'simple-pkg.json'),
      sources: {
        configure: path.join(fixtures, 'simple-configure.js'),
        commands: path.join(fixtures, 'def', 'commands.js'),
        options: path.join(fixtures, 'def', 'options.js'),
      },
      output: path.join(target, 'simple-compiled.js'),
      print: false
    }
  }
}

function run(opts, cb) {
  var prg = new Program('mock');
  load(prg, opts, cb);
}

mock.run = run;

module.exports = mock;
