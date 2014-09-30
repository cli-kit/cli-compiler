var expect = require('chai').expect
  , compiler = require('../..')
  , mock = require('../util/mock');

function converter(func) {
  expect(func).to.be.a('function');
  expect(func.name).to.eql('mockOptionConverter');
}

describe('cli-compiler:', function() {
  it('should compile definition merge program', function(done) {
    var opts = mock.opts.definition;
    compiler(opts, function(err, req) {
      expect(err).to.eql(undefined);
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');
      converter(req.program.options().mockOption.converter());

      // run an empty program against the compiled
      // closure loaded from disc
      mock.run(opts, function(err, prg) {
        expect(err).to.eql(null);
        expect(prg).to.be.an('object');
        converter(prg.options().mockOption.converter());
        done();
      });
    });
  });
})
