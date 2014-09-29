var expect = require('chai').expect
  , define = require('cli-define')
  , Program = define.Program
  , Command = define.Command
  , Option = define.Option
  , Flag = define.Flag
  , compiler = require('../..')
  , mock = require('../util/mock');

function converter(func) {
  expect(func).to.be.a('function');
  expect(func.name).to.eql('mockOptionConverter');
}

function sections(secs) {
  expect(secs).to.be.an('object');
  expect(secs['mock top-level section'])
    .to.be.an('object');
}

function subcommand(sub) {
  expect(sub).to.be.instanceof(Command);
  expect(sub.name()).to.eql('mock-sub-command, msc');
  expect(sub.key()).to.eql('mockSubCommand');
}

describe('cli-compiler:', function() {

  it('should compile simple program', function(done) {
    var opts = mock.opts.simple;
    compiler(opts, function(err, req) {
      //console.dir(err);
      expect(err).to.eql(undefined);
      expect(req).to.be.an('object');

      var program = req.program;

      expect(program).to.be.an('object');
      expect(program.options()).to.be.an('object');
      expect(program.commands()).to.be.an('object');

      // basic test on the compiled program (in-memory)
      var mockOption = program.options().mockOption;
      expect(mockOption).to.be.an('object');
      expect(mockOption.key()).to.eql('mockOption');
      expect(mockOption.names()).to.eql(['-o', '--mock-option']);

      converter(mockOption.converter());
      sections(program.sections());

      var mockCommand = program.commands().mockCommand;
      var mockSubCommand = mockCommand.commands().mockSubCommand;
      subcommand(mockSubCommand);

      // run an empty program against the compiled
      // closure loaded from disc
      mock.run(opts, function(err, prg) {

        expect(err).to.eql(null);
        expect(prg).to.be.an('object');
        expect(prg).to.be.an.instanceof(Program);
        expect(prg.name()).to.eql('simple-mock-program');
        expect(prg.version()).to.eql('1.0.0');

        var des = prg.description();
        expect(des).to.be.an('object');
        expect(des.txt).to.eql('Simple program.');
        expect(des.md).to.eql('*Simple* program.');

        var det = prg.detail();
        expect(det).to.be.an('object');
        expect(det.txt).to.eql('Mock detail about the program.');
        expect(det.md).to.eql('Mock `detail` about the program.');

        var opts = prg.options()
          , cmds = prg.commands();

        expect(opts).to.be.an('object');
        expect(cmds).to.be.an('object');

        expect(Object.keys(opts)).to.eql(['mockOption', 'mockFlag']);
        expect(Object.keys(cmds)).to.eql(['mockCommand']);

        expect(cmds.mockCommand).to.be.instanceof(Command);
        expect(opts.mockOption).to.be.instanceof(Option);
        expect(opts.mockFlag).to.be.instanceof(Flag);

        converter(opts.mockOption.converter());
        // loaded sections information
        sections(prg.sections());

        var mockCommand = prg.commands().mockCommand;
        var mockSubCommand = mockCommand.commands().mockSubCommand;
        //subcommand(mockCommand.commands());

        done();
      });
    });
  });
})
