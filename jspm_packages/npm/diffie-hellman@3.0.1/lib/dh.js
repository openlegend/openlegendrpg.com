/* */ 
(function(Buffer) {
  var BN = require('bn.js');
  var MillerRabin = require('miller-rabin');
  var millerRabin = new MillerRabin();
  var TWENTYFOUR = new BN(24);
  var ELEVEN = new BN(11);
  var TEN = new BN(10);
  var THREE = new BN(3);
  var SEVEN = new BN(7);
  var primes = require('./generatePrime');
  var randomBytes = require('randombytes');
  module.exports = DH;
  function setPublicKey(pub, enc) {
    enc = enc || 'utf8';
    if (!Buffer.isBuffer(pub)) {
      pub = new Buffer(pub, enc);
    }
    this._pub = new BN(pub);
    return this;
  }
  function setPrivateKey(priv, enc) {
    enc = enc || 'utf8';
    if (!Buffer.isBuffer(priv)) {
      priv = new Buffer(priv, enc);
    }
    this._priv = new BN(priv);
    return this;
  }
  var primeCache = {};
  function checkPrime(prime, generator) {
    var gen = generator.toString('hex');
    var hex = [gen, prime.toString(16)].join('_');
    if (hex in primeCache) {
      return primeCache[hex];
    }
    var error = 0;
    if (prime.isEven() || !primes.simpleSieve || !primes.fermatTest(prime) || !millerRabin.test(prime)) {
      error += 1;
      if (gen === '02' || gen === '05') {
        error += 8;
      } else {
        error += 4;
      }
      primeCache[hex] = error;
      return error;
    }
    if (!millerRabin.test(prime.shrn(1))) {
      error += 2;
    }
    var rem;
    switch (gen) {
      case '02':
        if (prime.mod(TWENTYFOUR).cmp(ELEVEN)) {
          error += 8;
        }
        break;
      case '05':
        rem = prime.mod(TEN);
        if (rem.cmp(THREE) && rem.cmp(SEVEN)) {
          error += 8;
        }
        break;
      default:
        error += 4;
    }
    primeCache[hex] = error;
    return error;
  }
  function defineError(self, error) {
    try {
      Object.defineProperty(self, 'verifyError', {
        enumerable: true,
        value: error,
        writable: false
      });
    } catch (e) {
      self.verifyError = error;
    }
  }
  function DH(prime, generator, malleable) {
    this.setGenerator(generator);
    this.__prime = new BN(prime);
    this._prime = BN.mont(this.__prime);
    this._primeLen = prime.length;
    this._pub = void 0;
    this._priv = void 0;
    if (malleable) {
      this.setPublicKey = setPublicKey;
      this.setPrivateKey = setPrivateKey;
      defineError(this, checkPrime(this.__prime, generator));
    } else {
      defineError(this, 8);
    }
  }
  DH.prototype.generateKeys = function() {
    if (!this._priv) {
      this._priv = new BN(randomBytes(this._primeLen));
    }
    this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed();
    return this.getPublicKey();
  };
  DH.prototype.computeSecret = function(other) {
    other = new BN(other);
    other = other.toRed(this._prime);
    var secret = other.redPow(this._priv).fromRed();
    var out = new Buffer(secret.toArray());
    var prime = this.getPrime();
    if (out.length < prime.length) {
      var front = new Buffer(prime.length - out.length);
      front.fill(0);
      out = Buffer.concat([front, out]);
    }
    return out;
  };
  DH.prototype.getPublicKey = function getPublicKey(enc) {
    return formatReturnValue(this._pub, enc);
  };
  DH.prototype.getPrivateKey = function getPrivateKey(enc) {
    return formatReturnValue(this._priv, enc);
  };
  DH.prototype.getPrime = function(enc) {
    return formatReturnValue(this.__prime, enc);
  };
  DH.prototype.getGenerator = function(enc) {
    return formatReturnValue(this._gen, enc);
  };
  DH.prototype.setGenerator = function(gen, enc) {
    enc = enc || 'utf8';
    if (!Buffer.isBuffer(gen)) {
      gen = new Buffer(gen, enc);
    }
    this._gen = new BN(gen);
    return this;
  };
  function formatReturnValue(bn, enc) {
    var buf = new Buffer(bn.toArray());
    if (!enc) {
      return buf;
    } else {
      return buf.toString(enc);
    }
  }
})(require('buffer').Buffer);
