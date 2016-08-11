'use strict';var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports = {name:"role.supplier", parts:null, part_generator:function() {
  module.exports.parts = [[CARRY, WORK, MOVE]];
  for(var e = module.exports.parts, b = 1, d = 1;;) {
    var c = [];
    b++;
    0 === b % 2 && d++;
    var a;
    for(a = 0;a < b;a++) {
      c.push(CARRY)
    }
    3 > b && c.push(WORK);
    for(a = 0;a < d;a++) {
      c.push(MOVE)
    }
    if(50 < c.length) {
      break
    }else {
      e.push(c)
    }
  }
}, run:function(e, b) {
  if(0 === b.carry.energy) {
    return new outcomes.PushTask({type:"resupply"})
  }
  var d, c = [[STRUCTURE_EXTENSION, STRUCTURE_SPAWN], STRUCTURE_TOWER, STRUCTURE_STORAGE], a, g = function(a) {
    return util.needs_energy(a) && a.is_type(d)
  }, f;
  for(f in c) {
    if(d = c[f], a = b.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter:g})) {
      break
    }
  }
  if(a) {
    return new outcomes.PushTask({type:"transfer_to", target_id:a.id})
  }
  b.say("sidle");
  b.move(Math.floor(8 * Math.random() + 1));
  return new outcomes.InProgress
}};
task_manager.register(module.exports.name, module.exports.run);
module.exports.part_generator();

