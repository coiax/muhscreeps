'use strict';var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.outcomes;
function role_cow(d, b) {
  b.add_flag("no_autorepair");
  var c = Game.getObjectById(d.source_id);
  if(!c) {
    b.say("Mooo!");
    var a = b.room.find(FIND_SOURCES), h = {};
    a.forEach(function(a) {
      h[a] = 0
    });
    for(var f in Game.creeps) {
      var k = Game.creeps[f];
      if(b.name !== k.name) {
        var g = k.has_task_in_queue(role_cow.name);
        g && (g = Game.getObjectById(g.source_id), h[g] += k.body_part_count(WORK))
      }
    }
    a = _.sortBy(a, function(a) {
      return h[a]
    });
    a.length && (c = a[0], d.source_id = c.id)
  }
  if(!c) {
    return b.say("Moo..."), new outcomes.InProgress
  }
  var e = util.memoryPosition(d.pasture_loc);
  e && 1 !== e.getRangeTo(c) && (b.say("Moo?"), e = d.pasture_loc = null);
  e || (a = c.pos.walkable_adjacent(), e = _.sample(a), d.pasture_loc = e);
  if(!e) {
    return b.say("...moo"), d.pasture_loc = null, d.source_id = null, new outcomes.InProgress
  }
  if(!e.isEqualTo(b.pos)) {
    if(e.isNearTo(b) && ((c = e.lookFor(FIND_CREEPS)) && c.length && c.forEach(function(a) {
      a.has_task_in_queue(module.exports.name) ? (d.source_id = null, d.pasture_loc = null) : (b.say("Mooove"), a.add_task({type:"leave", pos:e}))
    }), !d.pasture_loc)) {
      return new outcomes.InProgress
    }
    b.moveTo(e);
    return new outcomes.InProgress
  }
  a = Game.getObjectById(d.output_container_id);
  a || (f = b.pos.findInRange(FIND_STRUCTURES, 1, {filter:function(a) {
    return a.structureType === STRUCTURE_CONTAINER
  }}), f.length && (a = f[0], d.output_container_id = a.id));
  if(!a) {
    a = b.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {filter:function(a) {
      return a.structureType === STRUCTURE_CONTAINER
    }});
    if(a.length) {
      c = a[0]
    }else {
      return c = c.pos.getDirectionTo(b), b.pos.step(c).createConstructionSite(STRUCTURE_CONTAINER), new outcomes.InProgress
    }
    return new outcomes.PushTask({type:"construct", target_id:c.id, resupply:"harvest"})
  }
  if(a && 1 < a.pos.getRangeTo(b)) {
    return d.output_container_id = null, new outcomes.InProgress
  }
  f = b.harvest(c);
  switch(f) {
    case ERR_NOT_ENOUGH_RESOURCES:
      return new outcomes.PushTask({type:"idle", timeout:c.ticksToRegeneration});
    case ERR_NOT_OWNER:
    ;
    case ERR_BUSY:
    ;
    case ERR_NOT_FOUND:
    ;
    case ERR_INVALID_TARGET:
    ;
    case ERR_NOT_IN_RANGE:
    ;
    case ERR_NO_BODYPART:
      return new outcomes.TaskError("Harvest error " + f)
  }
  a.hits < a.hitsMax ? b.repair(a) : b.transfer(a, RESOURCE_ENERGY);
  return new outcomes.InProgress
}
role_cow.parts = [[WORK, CARRY, MOVE], [WORK, WORK, CARRY, MOVE], [WORK, WORK, WORK, CARRY, MOVE, MOVE], [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]];
task_manager.register(role_cow);

