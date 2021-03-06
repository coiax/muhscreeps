'use strict';var task_manager = require("task_manager"), outcomes = task_manager.outcomes;
function sort_structures(e) {
  return _.sortBy(e, function(b) {
    return b.hits
  })
}
function role_builder(e, b) {
  var a = Game.flags.Dismantle, c;
  a && (a.memory.assigned_creeps || (a.memory.assigned_creeps = []), _.remove(a.memory.assigned_creeps, function(a) {
    return!Game.creeps[a]
  }), c = a.memory.assigned_creeps.length);
  if("undefined" !== typeof c && 2 > c) {
    a.memory.assigned_creeps.push(b.name);
    if(!a.room) {
      return b.moveTo(a), new outcomes.InProgress
    }
    if((c = a.pos.findInRange(FIND_STRUCTURES, 0)) && c.length) {
      return new outcomes.PushTask({type:"dismantle", target_id:c[0].id})
    }
    a.remove()
  }
  if(0 === b.carry.energy) {
    return new outcomes.PushTask({type:"resupply"})
  }
  a = b.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
  c = sort_structures(b.room.find(FIND_MY_STRUCTURES, {filter:function(a) {
    return a.structureType !== STRUCTURE_RAMPART && a.hits < a.hitsMax
  }}));
  var f = sort_structures(b.room.find(FIND_STRUCTURES, {filter:function(a) {
    return a.hits < a.hitsMax
  }})), d;
  a ? d = a : c.length ? d = c[0] : f.length && (d = f[0]);
  if(d) {
    return new outcomes.PushTask({type:"construct", target_id:d.id})
  }
  b.say("no work");
  return new outcomes.InProgress
}
task_manager.register(role_builder);

