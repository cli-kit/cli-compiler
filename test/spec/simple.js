var expect = require('chai').expect;
var compiler = require('../..').compiler;
var mock = require('../util/mock');

describe('cli-compiler:', function() {

  it('should compile single option program', function(done) {
    var opts = mock.opts.simple;
    compiler(opts, function(err, req) {
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');
      expect(req.program.options()).to.be.an('object');
      expect(req.program.commands()).to.be.an('object');
      var options = req.program.options();
      var output = options.output;
      expect(output).to.be.an('object');
      expect(output.key()).to.eql('output');
      expect(output.names()).to.eql(['-o', '--output']);

      // run an empty program against the compiled
      // closure
      mock.run(opts, function(err, prg) {
        expect(err).to.eql(null);
        expect(prg).to.be.an('object');
        //console.dir(prg._options.output.name());
        //console.dir(prg._options.output.key());
        console.dir(Object.keys(prg.options()));
        console.dir(Object.keys(prg.commands()));
        done();
      });
    });
  });
})
