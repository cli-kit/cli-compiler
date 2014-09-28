var path = require('path')
  , base = path.normalize(path.join(__dirname, '..', '..'))
  , fixtures = path.join(base, 'test', 'fixtures');

var mock = {
  opts: {
    empty: {
      input: [
        path.join(fixtures, 'empty.md'),
        path.join(fixtures, 'empty'),
      ]
    },
    single: {
      input: [
        path.join(fixtures, 'single-option.md'),
      ],
      pkg: path.join(fixtures, 'single-option-pkg.json'),
      sources: {
        configure: path.join(fixtures, 'single-option-configure.js'),
      }
    }
  }
}

module.exports = mock;
