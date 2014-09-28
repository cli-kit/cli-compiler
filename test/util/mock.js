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
    }
  }
}

module.exports = mock;
