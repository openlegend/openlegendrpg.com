"use strict";

System.register(["chai", "app/app"], function (_export, _context) {
  "use strict";

  var chai, app, assert;
  return {
    setters: [function (_chai) {
      chai = _chai.default;
    }, function (_appApp) {
      app = _appApp.default;
    }],
    execute: function () {
      assert = chai.assert;
      describe('app', function () {
        it('exists', function () {
          assert.isDefined(app);
        }); // uncomment for a sanity check
        //it('can fail', function() {
        //assert.fail();
        //});
      });
    }
  };
});
//# sourceMappingURL=app.spec.js.map
