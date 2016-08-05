var task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports = {name:"role.looter", parts:null, generate_parts:function() {
  module.exports.parts = [[CARRY, MOVE]];
  for(var d = module.exports.parts, c = 1;;) {
    for(var a = [], b = 0;b < 2 * c;b++) {
      a.push(CARRY)
    }
    for(b = 0;b < c;b++) {
      a.push(MOVE)
    }
    if(50 < a.length) {
      break
    }else {
      d.push(a)
    }
    c++
  }
}, run:function(d, c) {
  var a = [STRUCTURE_CONTAINER, STRUCTURE_STORAGE];
  if(0 != c.carryCapacity - c.carry.energy) {
    var b = Game.flags.Loot;
    if(!b) {
      return c.say("noflag"), {outcome:"continue"}
    }
    a = b.pos.findStructures(a);
    if(!a.length) {
      return d = {type:"move_to", destination_pos:b.pos}, {outcome:"newtask", task:d}
    }
    d = {type:"resupply", gas_station_id:a[0].id}
  }else {
    b = Game.flags.Dropoff;
    if(!b) {
      return c.say("noflg2"), {outcome:"continue"}
    }
    a = b.pos.findStructures(a);
    if(!a.length) {
      return c.say("nostru"), {outcome:"continue"}
    }
    d = {type:"transfer_to", target_id:a[0].id}
  }
  return{outcome:"newtask", task:d}
}};
module.exports.generate_parts();
require("task_manager").register(module.exports.name, module.exports.run);

