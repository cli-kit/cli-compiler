var expect = require('chai').expect;
var compiler = require('../..').compiler;
var mock = require('../util/mock');

describe('cli-compiler:', function() {

  it('should error with no input files', function(done) {
    var opts = {};
    compiler(opts, function(err, req) {
      expect(err).to.be.instanceof(Error);
      done();
    });
  });

  it('should compile program', function(done) {
    var opts = mock.opts.vanilla;
    compiler(opts, function(err, req) {
      //console.dir('complete');
      //console.dir(arguments);
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');
      done();
    });
  });
})
