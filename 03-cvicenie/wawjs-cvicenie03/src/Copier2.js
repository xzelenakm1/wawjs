// just sample implementation
// for practice of coding styles
// not a real 'best' copyFile implementation
// FIXME: najdite bug, napiste test, spravte fix

const fs = require("fs");
const EventEmiter = require("events");

function Copier(from, to) {
  EventEmiter.call(this);
  //super();
  this._from = from;
  this._to = to;
}
Copier.prototype = Object.create(EventEmiter.prototype);
Copier.prototype.constructor = Copier;
Copier.prototype.copy = function() {

  let wasErr, iter = 0;

  const stream = fs.createReadStream(this._from);
  stream.on("data", (chunk) => {
    try {
      if(iter == 0)
        fs.writeFileSync(this._to, chunk);
      else
        fs.appendFileSync(this._to, chunk); //FIXME
      iter = 1;
    } catch (err) {
      wasErr = true;
      this.emit("error", err);
    }
  });
  stream.on("close", () => {
    !wasErr && this.emit("finish", {
      from: this._from,
      to: this._to
    });
  });
  stream.on("error", (err) => {
    this.emit("error", err);
  });
}

module.exports=Copier;
