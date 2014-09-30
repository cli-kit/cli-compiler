var expect = require('chai').expect
  , define = require('cli-define')
  , Program = define.Program
  , Command = define.Command
  , Option = define.Option
  , Flag = define.Flag
  , compiler = require('../..')
  , mock = require('../util/mock');

function assert(prg) {

  // top-level option
  var opt = prg.options().mockOption;
  expect(opt.converter()).to.be.a('function');

  // nested command level option
  opt = prg.commands().mockCommand
    .options().mockCommandOption;
  expect(opt.converter()).to.be.a('function');
}

describe('cli-compiler:', function() {

  it('should deep merge converters', function(done) {
    var opts = mock.opts.merge;
    compiler(opts, function(err, req) {
      expect(err).to.eql(undefined);
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');

      assert(req.program);

      // run an empty program against the compiled
      // closure loaded from disc
      mock.run(opts, function(err, prg) {
        expect(err).to.eql(null);
        expect(prg).to.be.an('object');

        assert(prg);

        done();
      });
    });
  });
})
