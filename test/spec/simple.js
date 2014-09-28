var expect = require('chai').expect
  , define = require('cli-define')
  , Program = define.Program
  , Command = define.Command
  , Option = define.Option
  , Flag = define.Flag
  , compiler = require('../..').compiler
  , mock = require('../util/mock')

describe('cli-compiler:', function() {

  it('should compile simple program', function(done) {
    var opts = mock.opts.simple;
    compiler(opts, function(err, req) {
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');
      expect(req.program.options()).to.be.an('object');
      expect(req.program.commands()).to.be.an('object');
      var options = req.program.options();
      var output = options.mockOption;
      expect(output).to.be.an('object');
      expect(output.key()).to.eql('mockOption');
      expect(output.names()).to.eql(['-o', '--mock-option']);

      // run an empty program against the compiled
      // closure
      mock.run(opts, function(err, prg) {
        expect(err).to.eql(null);
        expect(prg).to.be.an('object');
        expect(prg).to.be.an.instanceof(Program);
        var opts = prg.options()
          , cmds = prg.commands();

        expect(opts).to.be.an('object');
        expect(cmds).to.be.an('object');

        expect(Object.keys(opts)).to.eql(['mockOption', 'mockFlag']);
        expect(Object.keys(cmds)).to.eql(['mockCommand']);

        expect(cmds.mockCommand).to.be.instanceof(Command);
        expect(opts.mockOption).to.be.instanceof(Option);
        expect(opts.mockFlag).to.be.instanceof(Flag);

        done();
      });
    });
  });
})
