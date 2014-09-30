var loader = require('./lib/deprecated/loader');
var substitutor = require('./lib/deprecated/substitute');

module.exports = require('./lib');
module.exports.load = require('./lib/load');

module.exports.legacy = {
  load: loader,
  substitute: substitutor
}
