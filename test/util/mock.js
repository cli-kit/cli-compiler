var path = require('path')
  , base = path.normalize(path.join(__dirname, '..', '..'))
  , fixtures = path.join(base, 'test', 'fixtures');

var mock = {
  opts: {
    vanilla: {
      input: [
        path.join(fixtures, 'vanilla.md'),
        path.join(fixtures, 'vanilla'),
      ]
    }
  }
}

module.exports = mock;
