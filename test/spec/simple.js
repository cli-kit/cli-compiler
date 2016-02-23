var expect = require('chai').expect
  , define = require('cli-define')
  , Program = define.Program
  , Command = define.Command
  , compiler = require('../..')
  , mock = require('../util/mock');

function converter(func) {
  expect(func).to.be.a('function');
  expect(func.name).to.eql('mockOptionConverter');
}

function sections(secs) {
  expect(secs).to.be.an('object');
  expect(secs['mock-top-level-section'])
    .to.be.an('object');
}

function subcommand(sub) {
  expect(sub).to.be.instanceof(Command);
  expect(sub.name()).to.eql('mock-sub-command, msc');
  expect(sub.key()).to.eql('mockSubCommand');
}

function assert(prg) {
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

  // basic test on the compiled prg (in-memory)
  var mockOption = prg.options().mockOption;
  expect(mockOption).to.be.an('object');
  expect(mockOption.key()).to.eql('mockOption');
  expect(mockOption.names()).to.eql(['-o', '--mock-option']);

  converter(mockOption.converter());
  sections(prg.sections());

  var mockCommand = prg.commands().mockCommand;
  var mockSubCommand = mockCommand.commands().mockSubCommand;
  subcommand(mockSubCommand);
}

describe('cli-compiler:', function() {

  it('should compile simple program', function(done) {
    var opts = mock.opts.simple;
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


  it('should load simple program from cache', function(done) {
    var opts = mock.opts.simple;
    compiler(opts, function(err, req) {
      expect(err).to.eql(undefined);
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');

      assert(req.program);

      done();
    });
  });
})
