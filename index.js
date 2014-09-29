var loader = require('./lib/deprecated/loader');
var substitutor = require('./lib/deprecated/substitute');

module.exports = require('./lib');
module.exports.load = require('./lib/load');
module.exports.ConverterMap = require('./lib/converter-map');

module.exports.legacy = {
  load: loader,
  substitute: substitutor
}
