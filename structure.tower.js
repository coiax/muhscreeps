var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
function efficient_tower_repair(d, b) {
  var a = b.hitsMax - b.hits;
  if(!a) {
    return!1
  }
  var c = d.pos.getRangeTo(b), c = d.expected_power("repair", c);
  return a >= c
}
module.exports = {name:"structure.tower", run:function(d, b) {
  if(b.energy < TOWER_ENERGY_COST) {
    return new outcomes.InProgress
  }
  var a, c;
  a || (a = b.pos.findClosestByRange(FIND_HOSTILE_CREEPS), c = "attack");
  a || (a = b.pos.findDamagedFriendlyCreeps(), a = b.pos.findClosestByRange(a), c = "heal");
  a || (a = b.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter:function(a) {
    return a.structureType == STRUCTURE_RAMPART ? !1 : efficient_tower_repair(b, a)
  }}), c = "repair");
  if(!a) {
    var f = [STRUCTURE_CONTAINER, STRUCTURE_ROAD];
    d.wall_repair && f.push([STRUCTURE_WALL, STRUCTURE_RAMPART]);
    for(var g in f) {
      var h = f[g], e = b.room.find(FIND_STRUCTURES, {filter:function(a) {
        return _.includes(h, a.structureType) && efficient_tower_repair(b, a)
      }}), e = _.sortBy(e, _.property("hits"));
      if(e.length) {
        a = e[0];
        c = "repair";
        break
      }
    }
  }
  return a ? new outcomes.PushTask({type:"tower_target", target_id:a.id, mode:c, timeout:25}) : new outcomes.InProgress
}};
task_manager.register(module.exports.name, module.exports.run);

