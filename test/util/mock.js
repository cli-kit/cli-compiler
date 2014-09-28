var path = require('path')
  , base = path.normalize(path.join(__dirname, '..', '..'))
  , fixtures = path.join(base, 'test', 'fixtures')
  , vanilla = path.join(fixtures, 'vanilla.md');

var mock = {
  opts: {
    vanilla: {
      input: [vanilla]
    }
  }
}

module.exports = mock;
