var path = require('path')
  , base = path.normalize(path.join(__dirname, '..', '..'))
  , fixtures = path.join(base, 'test', 'fixtures')
  , target = path.join(base, 'target');

var mock = {
  opts: {
    empty: {
      input: [
        path.join(fixtures, 'empty.md'),
        path.join(fixtures, 'empty'),
      ]
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
      print: true
    }
  }
}

module.exports = mock;
