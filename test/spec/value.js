var expect = require('chai').expect
  , define = require('cli-define')
  , Program = define.Program
  , Command = define.Command
  , Option = define.Option
  , Flag = define.Flag
  , compiler = require('../..')
  , mock = require('../util/mock');

describe('cli-compiler:', function() {

  var source = new Program('mock-program');

  it('should re-use existing program', function(done) {
    var opts = mock.opts.simple;
    opts.program = source;
    compiler(opts, function(err, req) {
      expect(err).to.eql(undefined);
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');

      expect(req.program).to.eql(source);

      req.program.options().mockOption.value('mock-value');

      // run an empty program against the compiled
      // closure loaded from disc
      mock.run(opts, function(err, prg) {
        expect(err).to.eql(null);
        expect(prg).to.be.an('object');

        expect(prg).to.eql(source);

        expect(prg.options().mockOption.value()).to.eql(undefined);

        delete opts.program;

        done();
      });
    });
  });

  //it('should load simple program from cache', function(done) {
    //var opts = mock.opts.simple;
    //compiler(opts, function(err, req) {
      //expect(err).to.eql(undefined);
      //expect(req).to.be.an('object');
      //expect(req.program).to.be.an('object');

      ////assert(req.program);

      //done();
    //});
  //});
})
