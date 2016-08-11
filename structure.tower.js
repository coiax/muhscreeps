'use strict';var task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports = {name:"structure.tower", run:function(f, b) {
  if(b.energy < TOWER_ENERGY_COST) {
    return new outcomes.InProgress
  }
  var a, c;
  a || (a = b.pos.findClosestByRange(FIND_HOSTILE_CREEPS), c = "attack");
  a || (a = b.pos.findDamagedFriendlyCreeps(), a = b.pos.findClosestByRange(a), c = "heal");
  a || (a = b.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter:function(a) {
    return a.structureType === STRUCTURE_RAMPART ? !1 : a.is_damaged()
  }}), c = "repair");
  if(!a) {
    var e = [STRUCTURE_CONTAINER, STRUCTURE_ROAD];
    f.wall_repair && e.push([STRUCTURE_WALL, STRUCTURE_RAMPART]);
    for(var g in e) {
      var d = b.pos.findDamagedStructures(e[g]), d = _.sortBy(d, _.property("hits"));
      if(d.length) {
        a = d[0];
        c = "repair";
        break
      }
    }
  }
  return a ? new outcomes.PushTask({type:"tower_target", target_id:a.id, mode:c, timeout:25}) : new outcomes.InProgress
}};
task_manager.register(module.exports.name, module.exports.run);

