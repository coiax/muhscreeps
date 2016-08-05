var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports = {name:"role.supplier", parts:null, part_generator:function() {
  module.exports.parts = [[CARRY, WORK, MOVE]];
  for(var e = module.exports.parts, a = 1, b = 1;;) {
    var c = [];
    a++;
    0 == a % 2 && b++;
    for(var d = 0;d < a;d++) {
      c.push(CARRY)
    }
    3 > a && c.push(WORK);
    for(d = 0;d < b;d++) {
      c.push(MOVE)
    }
    if(50 < c.length) {
      break
    }else {
      e.push(c)
    }
  }
}, run:function(e, a) {
  if(0 == a.carry.energy) {
    var b = {type:"resupply"};
    return new outcomes.PushTask(b)
  }
  var b = [[STRUCTURE_EXTENSION, STRUCTURE_SPAWN], STRUCTURE_TOWER, STRUCTURE_STORAGE], c, d;
  for(d in b) {
    var f = b[d];
    if(c = a.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter:function(a) {
      return util.needs_energy(a) && a.is_type(f)
    }})) {
      break
    }
  }
  if(c) {
    return b = {type:"transfer_to", target_id:c.id}, new outcomes.PushTask(b)
  }
  a.say("sidle");
  a.move(Math.floor(8 * Math.random() + 1));
  return new outcomes.InProgress
}};
task_manager.register(module.exports.name, module.exports.run);
module.exports.part_generator();

