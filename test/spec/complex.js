var expect = require('chai').expect
  , compiler = require('../..')
  , mock = require('../util/mock');

describe('cli-compiler:', function() {

  it('should compile complex program', function(done) {
    var opts = mock.opts.complex;
    compiler(opts, function(err, req) {
      expect(err).to.eql(undefined);
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');
      done();
    });
  });


  it('should load complex program from cache', function(done) {
    var opts = mock.opts.complex;
    compiler(opts, function(err, req) {
      expect(err).to.eql(undefined);
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');
      done();
    });
  });
})
