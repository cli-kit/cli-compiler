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

  it('should compile empty program', function(done) {
    var opts = mock.opts.empty;
    compiler(opts, function(err, req) {
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');
      expect(req.program.options()).to.be.an('object');
      expect(req.program.commands()).to.be.an('object');
      expect(Object.keys(req.program.options())).to.eql([]);
      expect(Object.keys(req.program.commands())).to.eql([]);
      //console.dir(req.program.name());
      done();
    });
  });
})
