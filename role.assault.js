'use strict';var task_manager = require("task_manager"), outcomes = task_manager.outcomes;
function role_assault(e, b) {
  var a = [];
  a.length || (a = b.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3, {filter:function(a) {
    return a.is_type(STRUCTURE_TOWER)
  }}));
  a.length || (a = b.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3));
  a.length || (a = b.pos.findInRange(FIND_HOSTILE_CREEPS, 3));
  a.length && (b.rangedAttack(a[0]), b.say("pew!", !0));
  if(b.hits < b.hitsMax) {
    b.say("run!");
    var a = Game.flags.Retreat, c = a.pos.roomName, d = b.pos.roomName;
    c !== d && (a = Game.map.findExit(d, c), a = b.pos.findClosestByRange(a));
    b.moveTo(a)
  }else {
    b.moveTo(Game.flags.Target)
  }
  return new outcomes.InProgress
}
role_assault.parts = [[TOUGH, MOVE, RANGED_ATTACK], [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]];
task_manager.register(role_assault);

