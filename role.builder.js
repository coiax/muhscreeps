var task_manager = require("task_manager"), outcomes = require("task_manager.globals").outcomes;
function sort_construction_sites(f) {
  return _.orderBy(f, function(b) {
    return b.progressTotal - b.progress
  }, "desc")
}
function sort_structures(f) {
  return _.sortBy(f, function(b) {
    return b.hits
  })
}
var roleBuilder = {name:"role.builder", run:function(f, b) {
  var a = Game.flags.Dismantle, c;
  if(a) {
    a.memory.assigned_creeps || (a.memory.assigned_creeps = []);
    for(var e in a.memory.assigned_creeps) {
      Game.creeps[e] || (a.memory.assigned_creeps[e] = void 0)
    }
    c = a.memory.assigned_creeps.length
  }
  if("undefined" != typeof c && 2 > c) {
    a.memory.assigned_creeps.push(b.name);
    if(!a.room) {
      return b.moveTo(a), new outcomes.InProgress
    }
    if((c = a.pos.findInRange(FIND_STRUCTURES, 0)) && c.length) {
      var d = {type:"dismantle", target_id:c[0].id};
      return new outcomes.PushTask(d)
    }
    a.remove()
  }
  if(0 == b.carry.energy) {
    return new outcomes.PushTask({type:"resupply"})
  }
  a = b.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
  c = sort_structures(b.room.find(FIND_MY_STRUCTURES, {filter:function(a) {
    return a.structureType != STRUCTURE_RAMPART && a.hits < a.hitsMax
  }}));
  e = sort_structures(b.room.find(FIND_STRUCTURES, {filter:function(a) {
    return a.hits < a.hitsMax
  }}));
  a ? d = a : c.length ? d = c[0] : e.length && (d = e[0]);
  if(d) {
    return d = {type:"construct", target_id:d.id}, new outcomes.PushTask(d)
  }
  b.say("no work");
  return new outcomes.InProgress
}};
module.exports = roleBuilder;
task_manager.register(roleBuilder.name, roleBuilder.run);

