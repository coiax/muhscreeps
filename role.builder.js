var task_manager = require("task_manager"), outcomes = require("task_manager.globals").outcomes;
function sort_construction_sites(e) {
  return _.orderBy(e, function(a) {
    return a.progressTotal - a.progress
  }, "desc")
}
function sort_structures(e) {
  return _.sortBy(e, function(a) {
    return a.hits
  })
}
var roleBuilder = {name:"role.builder", run:function(e, a) {
  var b = Game.flags.Dismantle;
  if(b) {
    if(!b.room) {
      return a.moveTo(b), new outcomes.InProgress
    }
    var d = b.pos.findInRange(FIND_STRUCTURES, 0);
    if(d && d.length) {
      var c = {type:"dismantle", target_id:d[0].id};
      return new outcomes.PushTask(c)
    }
    b.remove()
  }
  if(0 == a.carry.energy) {
    return new outcomes.PushTask({type:"resupply"})
  }
  var b = a.pos.findClosestByRange(FIND_CONSTRUCTION_SITES), d = sort_structures(a.room.find(FIND_MY_STRUCTURES, {filter:function(a) {
    return a.structureType != STRUCTURE_RAMPART && a.hits < a.hitsMax
  }})), f = sort_structures(a.room.find(FIND_STRUCTURES, {filter:function(a) {
    return a.hits < a.hitsMax
  }}));
  b ? c = b : d.length ? c = d[0] : f.length && (c = f[0]);
  if(c) {
    return c = {type:"construct", target_id:c.id}, new outcomes.PushTask(c)
  }
  a.say("no work");
  return new outcomes.InProgress
}};
module.exports = roleBuilder;
task_manager.register(roleBuilder.name, roleBuilder.run);

