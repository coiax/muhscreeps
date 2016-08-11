'use strict';var util = require("util");
module.exports.log = function(a, b, d) {
  var c = this.get_memory();
  c.log || (c.log = []);
  a = {level:a, message:d, tick:Game.time, subsystem:b};
  "undefined" !== typeof this.say && this.say(b + ":" + d);
  c.log.push(a);
  util.keep_n_values(c.log, 20)
};
module.exports.warning = function(a, b) {
  this.log("warning", a, b)
};
module.exports.error = function(a, b) {
  this.log("error", a, b)
};

