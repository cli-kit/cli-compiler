var expect = require('chai').expect;
var compiler = require('../..').compiler;
var mock = require('../util/mock');

describe('cli-compiler:', function() {

  it('should compile single option program', function(done) {
    var opts = mock.opts.single;
    compiler(opts, function(err, req) {
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');
      expect(req.program.options()).to.be.an('object');
      expect(req.program.commands()).to.be.an('object');
      var opts = req.program.options();
      var output = opts.output;
      expect(output).to.be.an('object');
      expect(output.key()).to.eql('output');
      expect(output.names()).to.eql(['-o', '--output']);
      done();
    });
  });
})
