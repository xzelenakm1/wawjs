const assert = require("assert");
describe("cvicenie3", function() {
    it("flat", function() {
      let x = {
        px:10
      };
      let y = Object.create(x);
      y.py = 20;
      let z = Object.create(y);
      z.pz = 30;

      var i = 0;
      function flat(o){
        for(let prop in o){
          if(!o.hasOwnProperty(prop)){
            let tmp = Object.getPrototypeOf(o);
            while(tmp){
              if(tmp.hasOwnProperty(prop)){
                o[prop] = tmp[prop];
                break;
              }
              tmp = Object.getPrototypeOf(tmp);
            }
          }
        }
        return o;
      }

      let r = flat(z);
      assert(r.hasOwnProperty('px'));
      assert(r.hasOwnProperty('py'));
      assert(r.hasOwnProperty('pz'));
      assert(r === z);
    });
});
