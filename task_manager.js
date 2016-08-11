'use strict';var cpu_tracker = require("cpu_tracker"), util = require("util"), cpu_debug = util.cpu_debug, globals = require("task_manager.globals"), outcomes = globals.outcomes, task_functions = {harvest:function(d, b) {
  if(b.is_full()) {
    return outcomes.AlreadyComplete()
  }
  var a = Game.getObjectById(d.selected_source_id);
  if(!a && (a = b.pos.findClosestByRange(FIND_SOURCES, {filter:function(a) {
    return a.is_harvestable(b)
  }}))) {
    d.selected_source_id = a.id
  }
  if(!a) {
    return d.no_resupply ? {pop:!0, warning:"No sources found.", push:{type:"idle", timeout:Math.floor(20 * Math.random() + 10)}} : new outcomes.PushTask({type:"resupply"})
  }
  var c = b.harvest(a);
  switch(c) {
    case ERR_NOT_OWNER:
    ;
    case ERR_BUSY:
    ;
    case ERR_NOT_FOUND:
    ;
    case ERR_INVALID_TARGET:
    ;
    case ERR_NO_BODYPART:
      return new outcomes.TaskError(c);
    case ERR_NOT_IN_RANGE:
      if(a.is_harvestable(b)) {
        return b.moveTo(a), new outcomes.InProgress
      }
      d.selected_source_id = null;
      return new outcomes.Rerun;
    case OK:
      return new outcomes.InProgress;
    case ERR_NOT_ENOUGH_RESOURCES:
      return d.selected_source_id = null, new outcomes.Rerun
  }
}, construct:function(d, b) {
  var a = d.resupply, c = Game.getObjectById(d.target_id);
  if(!b.body_part_count(WORK, !0)) {
    return new outcomes.Failure("No WORK parts.")
  }
  if(!b.body_part_count(CARRY, !0)) {
    return new outcomes.Failure("No CARRY parts.")
  }
  if(!c) {
    return"build" == d.mode ? new outcomes.AlreadyComplete : new outcomes.Failure("Target not found.")
  }
  if(0 == b.carry.energy) {
    return a ? new outcomes.PushTask({type:a}) : new outcomes.Failure("No energy, resupply disabled.")
  }
  if("undefined" == typeof c.progress) {
    d.mode = "repair";
    if(c.hits == c.hitsMax) {
      return new outcomes.AlreadyComplete
    }
    a = b.repair(c)
  }else {
    d.mode = "build", b.cancelOrder("repair"), a = b.build(c)
  }
  switch(a) {
    case ERR_NOT_OWNER:
    ;
    case ERR_BUSY:
    ;
    case ERR_NOT_ENOUGH_RESOURCES:
    ;
    case ERR_INVALID_TARGET:
    ;
    case ERR_NO_BODYPART:
    ;
    case ERR_RCL_NOT_ENOUGH:
      return new outcomes.TaskError(a);
    case ERR_NOT_IN_RANGE:
      b.moveTo(c);
    case OK:
      return new outcomes.InProgress
  }
}, resupply:function(d, b) {
  _.sum(b.carry);
  if(b.is_full()) {
    return new outcomes.AlreadyComplete
  }
  var a = Game.getObjectById(d.gas_station_id);
  if(!a) {
    var c = [STRUCTURE_CONTAINER, STRUCTURE_STORAGE], f = b.room.find(FIND_STRUCTURES, {filter:function(a) {
      return a.is_type(c) && a.store[RESOURCE_ENERGY]
    }}), e = b.room.find(FIND_DROPPED_ENERGY), f = f.concat(e);
    if(f.length) {
      if(a = b.pos.findClosestByRange(f), a.structureType) {
        d.gas_station_id = a.id
      }else {
        return d = {type:"pickup", target_id:a.id}, new outcomes.PushTask(d)
      }
    }
  }
  if(!a) {
    return d = {type:"harvest", timeout:30, no_resupply:!0}, new outcomes.PushTask(d)
  }
  f = b.withdraw(a, RESOURCE_ENERGY);
  return f == ERR_NOT_IN_RANGE ? (b.moveTo(a), new outcomes.InProgress) : f == ERR_NOT_ENOUGH_RESOURCES ? (d.gas_station_id = null, new outcomes.Rerun) : f != OK ? (b.say("rs!" + f), new outcomes.InProgress) : new outcomes.Complete
}, renew:function(d, b) {
  if(1400 <= b.ticksToLive) {
    return new outcomes.AlreadyComplete
  }
  var a = Game.getObjectById(d.spawn_id);
  if(!a) {
    var a = [], c;
    for(c in Game.spawns) {
      a.push(Game.spawns[c])
    }
    if(a = b.pos.findClosestByRange(a)) {
      d.spawn_id = a.id
    }
  }
  if(!a) {
    return outcome.Failure("No nearby spawn found.")
  }
  c = a.renewCreep(b);
  b.transfer(a, RESOURCE_ENERGY);
  switch(c) {
    case ERR_INVALID_TARGET:
    ;
    case ERR_NOT_OWNER:
      return outcome.TaskError(c);
    case OK:
    ;
    case ERR_BUSY:
      return outcome.InProgress();
    case ERR_NOT_ENOUGH_ENERGY:
      return outcome.Failure("Spawn has not enough energy.");
    case ERR_FULL:
      return outcome.AlreadyComplete();
    case ERR_NOT_IN_RANGE:
      return b.moveTo(a), outcome.InProgress()
  }
}, transfer_to:function(d, b) {
  var a = Game.getObjectById(d.target_id), c = util.memoryPosition(d.destination_pos), f = d.resource_type || RESOURCE_ENERGY, e = d.amount;
  if(!a && !c) {
    return new outcomes.TaskError("No target or destination.")
  }
  if(!b.carry[f]) {
    return new outcomes.TaskError("Creep not carrying " + f)
  }
  "undefined" != typeof e && (e = max(b.carry[f], e), d.amount = e);
  if(!a) {
    if(c.roomName == b.room.name) {
      var c = c.look(LOOK_STRUCTURES), k;
      for(k in c) {
        var h = c[k], g = b.transfer(h, f, e);
        if(g != ERR_INVALID_TARGET) {
          a = h;
          d.target_id = a.id;
          break
        }
      }
      if(!a) {
        var l = "No target found at destination."
      }
      return new outcomes.TaskError(l)
    }
    b.moveTo(c);
    return new outcomes.InProgress
  }
  d.destination_pos = a.pos;
  g = b.transfer(a, f, e);
  switch(g) {
    case ERR_NOT_OWNER:
    ;
    case ERR_BUSY:
    ;
    case ERR_NOT_ENOUGH_RESOURCES:
    ;
    case ERR_INVALID_ARGS:
    ;
    case ERR_INVALID_TARGET:
      return new outcomes.TaskError(g);
    case ERR_FULL:
      return new outcomes.AlreadyComplete;
    case ERR_NOT_IN_RANGE:
      return b.moveTo(a), new outcomes.InProgress;
    case OK:
      return new outcomes.Complete
  }
}, tower_target:function(d, b) {
  var a = Game.getObjectById(d.target_id), c = d.mode;
  if(!a) {
    return new outcomes.Failure("No target.")
  }
  if(!c) {
    return new outcomes.TaskError("No mode.")
  }
  if(b.energy < TOWER_ENERGY_COST) {
    return new outcomes.InProgress
  }
  switch(c) {
    case "heal":
      if(a.hits == a.hitsMax) {
        return new outcomes.AlreadyComplete
      }
      a = b.heal(a);
      break;
    case "repair":
      if(a.hits == a.hitsMax) {
        return new outcomes.AlreadyComplete
      }
      a = b.repair(a);
      break;
    case "attack":
      a = b.attack(a);
      break;
    default:
      return new outcomes.TaskError("Bad mode " + c)
  }
  switch(a) {
    case ERR_INVALID_TARGET:
    ;
    case ERR_RCL_NOT_ENOUGH:
    ;
    case ERR_NOT_ENOUGH_RESOURCES:
      return new outcomes.TaskError(a);
    case OK:
      return new outcomes.InProgress
  }
}, dismantle:function(d, b) {
  b.add_flag("no_autopickup");
  var a = Game.getObjectById(d.target_id);
  if(!a) {
    return new outcomes.Failure("No target found.")
  }
  if(b.carryCapacity && b.is_full()) {
    return d = {type:"deposit"}, new outcomes.PushTask(d)
  }
  var c = b.dismantle(a);
  switch(c) {
    case ERR_NOT_IN_RANGE:
      return b.moveTo(a), new outcomes.InProgress;
    case OK:
      return new outcomes.InProgress;
    default:
      return new outcomes.TaskError(c)
  }
}, leave_location:function(d, b) {
  var a = util.memoryPosition(d.pos);
  return b.pos.isEqualTo(a) ? (b.say("Aaaaaa!"), b.move(Math.floor(8 * Math.random() + 1)), new outcomes.InProgress) : new outcomes.AlreadyComplete
}, move_to:function(d, b) {
  var a = Game.getObjectById(d.target_id), a = a ? a.pos : util.memoryPosition(d.destination_pos);
  return!a ? new outcomes.TaskError("No destination found.") : b.pos.isEqualTo(a) ? new outcomes.AlreadyComplete : b.moveTo(a) == ERR_NO_PATH ? new outcomes.Failure("No path found.") : new outcomes.InProgress
}, suicide:function(d, b) {
  b.suicide();
  return new outcomes.Complete
}, recycle:function(d, b) {
  var a = Game.getObjectById(d.spawn_id);
  if(!a) {
    var a = [], c;
    for(c in Game.spawns) {
      a.push(Game.spawns[c])
    }
    if(a = b.pos.findClosestByPath(a)) {
      d.spawn_id = a.id
    }
  }
  return!a ? (b.suicide(), new outcomes.Complete) : a.recycleCreep(b) == ERR_NOT_IN_RANGE ? (b.moveTo(a), new outcomes.InProgress) : new outcomes.Complete
}, pickup:function(d, b) {
  if(b.is_full()) {
    return new outcomes.AlreadyComplete
  }
  var a = Game.getObjectById(d.target_id);
  if(!a) {
    return new outcomes.Failure("No target found.")
  }
  var c = b.pickup(a);
  return c == ERR_NOT_IN_RANGE ? (b.moveTo(a), new outcomes.InProgress) : c == ERR_INVALID_TARGET ? new outcomes.Failure(c) : new outcomes.Complete
}, travel_to_room:function(d, b) {
  var a = d.destination_room, c = b.room.name;
  if(!a) {
    return new outcomes.TaskError("No room given.")
  }
  if(c == a) {
    return new outcomes.AlreadyComplete
  }
  if(!d.route) {
    rc = Game.map.findRoute(c, a);
    if(rc == ERR_NO_PATH) {
      return new outcomes.Failure("No path to destination.")
    }
    d.route = rc;
    d.route_index = 0
  }
  c = d.route[d.route_index];
  d.route_index += 1;
  a = c.room;
  return(c = b.pos.findClosestByPath(c.exit)) ? new outcomes.PushTask({type:"move_to_exit", destination:c, destination_room:a}) : new outcomes.Failure("No path to exit.")
}, move_to_exit:function(d, b) {
  var a = util.memoryPosition(d.destination), c = d.destination_room, f = b.room.name;
  if(c == f || b.pos == a) {
    return new outcomes.AlreadyComplete
  }
  if(!a || !c || a.roomName != f) {
    return new outcomes.TaskError("Invalid destination/room")
  }
  b.moveTo(a);
  return new outcomes.InProgress
}, taskless:function(d, b) {
  var a = b.body_part_count(WORK), c = b.body_part_count(CARRY), a = b.body_part_count(CLAIM) ? "role.claimer" : !a && !c ? "role.dumbscout" : a && !c ? "role.cow" : !a && c ? "role.supplier" : _.sample(["role.supplier", "role.cow", "role.upgrader", "role.builder"]);
  return new outcomes.ReplaceTask({type:a})
}, idle:function(d, b) {
  b.say("Zzz");
  return new outcomes.InProgress
}, deposit:function(d, b) {
  var a = d.resource_type || RESOURCE_ENERGY;
  if(b.is_empty()) {
    return new outcomes.AlreadyComplete
  }
  var c = d.target_room;
  if(!c) {
    (c = b.get_support()) || (c = _.sample(Game.spawns));
    if(!c) {
      return new outcomes.TaskError("No spawns exist.")
    }
    c = c.room.name;
    d.target_room = c
  }
  if(c = b.pos.findClosestByRange(storages)) {
    return new outcomes.PushTask({type:"transfer_to", target_id:c.id, resource_type:a})
  }
  b.drop(a);
  return new outcomes.TaskError("Could not find storage.")
}};
module.exports = {globals:require("task_manager.globals"), task_functions:task_functions, register:function(d, b) {
  task_functions[d] = b
}, run_task_queue:function(d, b) {
  for(var a = 100;b && b.length && 0 < a;) {
    a--;
    var c = b[0];
    "undefined" == typeof c.times_run && (c.times_run = 0);
    var f = c.type, e, k = cpu_tracker.start("tasks", f), h = task_functions[f];
    if(h) {
      try {
        e = h(c, d)
      }catch(g) {
        console.log(g.stack), e = new outcomes.TaskError("Exception: " + g)
      }
    }else {
      e = new outcomes.TaskError("No handler for task type.")
    }
    cpu_tracker.stop(k);
    e && e.outcome && (e = new outcomes.TaskError("Outcome is old format."));
    e || (e = new outcomes.TaskError("No outcome returned."));
    c.times_run >= c.timeout && (e.pop = !0);
    e.pop && d.pop_task();
    e.increment && (c.times_run += e.increment);
    e.push && d.add_task(e.push);
    e.warning && d.warning("task", e.warning);
    e.error && (c = "Task(" + f + "): " + e.error, console.log(c), d.error("task", c));
    if(e.stop) {
      break
    }
  }
  0 == a && cpu_debug("Task queue sanity timed out for " + d)
}};

