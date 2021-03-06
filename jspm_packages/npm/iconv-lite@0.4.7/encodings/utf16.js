/* */ 
(function(Buffer) {
  exports.utf16be = function(options) {
    return {
      encoder: utf16beEncoder,
      decoder: utf16beDecoder,
      bom: new Buffer([0xFE, 0xFF])
    };
  };
  function utf16beEncoder(options) {
    return {
      write: utf16beEncoderWrite,
      end: function() {}
    };
  }
  function utf16beEncoderWrite(str) {
    var buf = new Buffer(str, 'ucs2');
    for (var i = 0; i < buf.length; i += 2) {
      var tmp = buf[i];
      buf[i] = buf[i + 1];
      buf[i + 1] = tmp;
    }
    return buf;
  }
  function utf16beDecoder(options) {
    return {
      write: utf16beDecoderWrite,
      end: function() {},
      overflowByte: -1
    };
  }
  function utf16beDecoderWrite(buf) {
    if (buf.length == 0)
      return '';
    var buf2 = new Buffer(buf.length + 1),
        i = 0,
        j = 0;
    if (this.overflowByte !== -1) {
      buf2[0] = buf[0];
      buf2[1] = this.overflowByte;
      i = 1;
      j = 2;
    }
    for (; i < buf.length - 1; i += 2, j += 2) {
      buf2[j] = buf[i + 1];
      buf2[j + 1] = buf[i];
    }
    this.overflowByte = (i == buf.length - 1) ? buf[buf.length - 1] : -1;
    return buf2.slice(0, j).toString('ucs2');
  }
  exports.utf16 = function(options) {
    return {
      encoder: utf16Encoder,
      decoder: utf16Decoder,
      getCodec: options.iconv.getCodec
    };
  };
  function utf16Encoder(options) {
    options = options || {};
    var codec = this.getCodec(options.use || 'utf-16be');
    if (!codec.bom)
      throw new Error("iconv-lite: in UTF-16 encoder, 'use' parameter should be either UTF-16BE or UTF16-LE.");
    return {
      write: utf16EncoderWrite,
      end: utf16EncoderEnd,
      bom: codec.bom,
      internalEncoder: codec.encoder(options)
    };
  }
  function utf16EncoderWrite(str) {
    var buf = this.internalEncoder.write(str);
    if (this.bom) {
      buf = Buffer.concat([this.bom, buf]);
      this.bom = null;
    }
    return buf;
  }
  function utf16EncoderEnd() {
    return this.internalEncoder.end();
  }
  function utf16Decoder(options) {
    return {
      write: utf16DecoderWrite,
      end: utf16DecoderEnd,
      internalDecoder: null,
      initialBytes: [],
      initialBytesLen: 0,
      options: options || {},
      getCodec: this.getCodec
    };
  }
  function utf16DecoderWrite(buf) {
    if (this.internalDecoder)
      return this.internalDecoder.write(buf);
    this.initialBytes.push(buf);
    this.initialBytesLen += buf.length;
    if (this.initialBytesLen < 16)
      return '';
    return utf16DecoderDecideEndianness.call(this);
  }
  function utf16DecoderEnd() {
    if (this.internalDecoder)
      return this.internalDecoder.end();
    var res = utf16DecoderDecideEndianness.call(this);
    var trail;
    if (this.internalDecoder)
      trail = this.internalDecoder.end();
    return (trail && trail.length > 0) ? (res + trail) : res;
  }
  function utf16DecoderDecideEndianness() {
    var buf = Buffer.concat(this.initialBytes);
    this.initialBytes.length = this.initialBytesLen = 0;
    if (buf.length < 2)
      return '';
    var enc = this.options.default || 'utf-16be';
    if (buf[0] == 0xFE && buf[1] == 0xFF) {
      enc = 'utf-16be';
      buf = buf.slice(2);
    } else if (buf[0] == 0xFF && buf[1] == 0xFE) {
      enc = 'utf-16le';
      buf = buf.slice(2);
    } else {
      var spaces = [0, 0],
          _len = Math.min(buf.length - (buf.length % 2), 64);
      for (var i = 0; i < _len; i += 2) {
        if (buf[i] == 0x00 && buf[i + 1] == 0x20)
          spaces[0]++;
        if (buf[i] == 0x20 && buf[i + 1] == 0x00)
          spaces[1]++;
      }
      if (spaces[0] > 0 && spaces[1] == 0)
        enc = 'utf-16be';
      else if (spaces[0] == 0 && spaces[1] > 0)
        enc = 'utf-16le';
    }
    this.internalDecoder = this.getCodec(enc).decoder(this.options);
    return this.internalDecoder.write(buf);
  }
})(require('buffer').Buffer);
