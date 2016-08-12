'use strict';var cpu_tracker = require("cpu_tracker"), util = require("util"), cpu_debug = util.cpu_debug, globals = require("task_manager.globals"), outcomes = globals.outcomes, task_functions = {harvest:function(c, b) {
  if(b.is_full()) {
    return outcomes.AlreadyComplete()
  }
  var a = Game.getObjectById(c.selected_source_id);
  if(!a && (a = b.pos.findClosestByRange(FIND_SOURCES, {filter:function(a) {
    return a.is_harvestable(b)
  }}))) {
    c.selected_source_id = a.id
  }
  if(!a) {
    return c.no_resupply ? {pop:!0, warning:"No sources found.", push:{type:"idle", timeout:Math.floor(20 * Math.random() + 10)}} : new outcomes.PushTask({type:"resupply"})
  }
  var d = b.harvest(a);
  switch(d) {
    case ERR_NOT_OWNER:
    ;
    case ERR_BUSY:
    ;
    case ERR_NOT_FOUND:
    ;
    case ERR_INVALID_TARGET:
    ;
    case ERR_NO_BODYPART:
      return new outcomes.TaskError(d);
    case ERR_NOT_IN_RANGE:
      if(a.is_harvestable(b)) {
        return b.moveTo(a), new outcomes.InProgress
      }
      c.selected_source_id = null;
      return new outcomes.Rerun;
    case OK:
      return new outcomes.InProgress;
    case ERR_NOT_ENOUGH_RESOURCES:
      return c.selected_source_id = null, new outcomes.Rerun
  }
}, construct:function(c, b) {
  var a = c.resupply, d = Game.getObjectById(c.target_id);
  if(!b.body_part_count(WORK, !0)) {
    return new outcomes.Failure("No WORK parts.")
  }
  if(!b.body_part_count(CARRY, !0)) {
    return new outcomes.Failure("No CARRY parts.")
  }
  if(!d) {
    return"build" === c.mode ? new outcomes.AlreadyComplete : new outcomes.Failure("Target not found.")
  }
  if(0 === b.carry.energy) {
    return a ? new outcomes.PushTask({type:a}) : new outcomes.Failure("No energy, resupply disabled.")
  }
  if("undefined" === typeof d.progress) {
    c.mode = "repair";
    if(d.hits === d.hitsMax) {
      return new outcomes.AlreadyComplete
    }
    a = b.repair(d)
  }else {
    c.mode = "build", b.cancelOrder("repair"), a = b.build(d)
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
      b.moveTo(d);
    case OK:
      return new outcomes.InProgress
  }
}, resupply:function(c, b) {
  if(b.is_full()) {
    return new outcomes.AlreadyComplete
  }
  var a = Game.getObjectById(c.gas_station_id);
  if(!a) {
    var d = [STRUCTURE_CONTAINER, STRUCTURE_STORAGE], e = b.room.find(FIND_STRUCTURES, {filter:function(a) {
      return a.is_type(d) && a.store[RESOURCE_ENERGY]
    }}), g = b.room.find(FIND_DROPPED_ENERGY), e = e.concat(g);
    if(e.length) {
      if(a = b.pos.findClosestByRange(e), a.structureType) {
        c.gas_station_id = a.id
      }else {
        return new outcomes.PushTask({type:"pickup", target_id:a.id})
      }
    }
  }
  if(!a) {
    return new outcomes.PushTask({type:"harvest", timeout:30, no_resupply:!0})
  }
  e = b.withdraw(a, RESOURCE_ENERGY);
  return e === ERR_NOT_IN_RANGE ? (b.moveTo(a), new outcomes.InProgress) : e === ERR_NOT_ENOUGH_RESOURCES ? (c.gas_station_id = null, new outcomes.Rerun) : e !== OK ? (b.say("rs!" + e), new outcomes.InProgress) : new outcomes.Complete
}, renew:function(c, b) {
  if(1400 <= b.ticksToLive) {
    return new outcomes.AlreadyComplete
  }
  var a = Game.getObjectById(c.spawn_id);
  if(!a) {
    var a = [], d;
    for(d in Game.spawns) {
      a.push(Game.spawns[d])
    }
    if(a = b.pos.findClosestByRange(a)) {
      c.spawn_id = a.id
    }
  }
  if(!a) {
    return new outcomes.Failure("No nearby spawn found.")
  }
  d = a.renewCreep(b);
  b.transfer(a, RESOURCE_ENERGY);
  switch(d) {
    case ERR_INVALID_TARGET:
    ;
    case ERR_NOT_OWNER:
      return new outcomes.TaskError(d);
    case OK:
    ;
    case ERR_BUSY:
      return new outcomes.InProgress;
    case ERR_NOT_ENOUGH_ENERGY:
      return new outcomes.Failure("Spawn has not enough energy.");
    case ERR_FULL:
      return new outcomes.AlreadyComplete;
    case ERR_NOT_IN_RANGE:
      return b.moveTo(a), new outcomes.InProgress
  }
}, transfer_to:function(c, b) {
  var a = Game.getObjectById(c.target_id), d = util.memoryPosition(c.destination_pos), e = c.resource_type || RESOURCE_ENERGY, g = c.amount;
  if(!a && !d) {
    return new outcomes.TaskError("No target or destination.")
  }
  if(!b.carry[e]) {
    return new outcomes.TaskError("Creep not carrying " + e)
  }
  "undefined" !== typeof g && (g = Math.max(b.carry[e], g), c.amount = g);
  if(!a) {
    if(d.roomName === b.room.name) {
      var d = d.look(LOOK_STRUCTURES), f;
      for(f in d) {
        var h = d[f];
        if(b.transfer(h, e, g) !== ERR_INVALID_TARGET) {
          a = h;
          c.target_id = a.id;
          break
        }
      }
      if(!a) {
        var k = "No target found at destination."
      }
      return new outcomes.TaskError(k)
    }
    b.moveTo(d);
    return new outcomes.InProgress
  }
  c.destination_pos = a.pos;
  e = b.transfer(a, e, g);
  switch(e) {
    case ERR_NOT_OWNER:
    ;
    case ERR_BUSY:
    ;
    case ERR_NOT_ENOUGH_RESOURCES:
    ;
    case ERR_INVALID_ARGS:
    ;
    case ERR_INVALID_TARGET:
      return new outcomes.TaskError(e);
    case ERR_FULL:
      return new outcomes.AlreadyComplete;
    case ERR_NOT_IN_RANGE:
      return b.moveTo(a), new outcomes.InProgress;
    case OK:
      return new outcomes.Complete
  }
}, tower_target:function(c, b) {
  var a = Game.getObjectById(c.target_id), d = c.mode;
  if(!a) {
    return new outcomes.Failure("No target.")
  }
  if(!d) {
    return new outcomes.TaskError("No mode.")
  }
  if(b.energy < TOWER_ENERGY_COST) {
    return new outcomes.InProgress
  }
  switch(d) {
    case "heal":
      if(a.hits === a.hitsMax) {
        return new outcomes.AlreadyComplete
      }
      a = b.heal(a);
      break;
    case "repair":
      if(a.hits === a.hitsMax) {
        return new outcomes.AlreadyComplete
      }
      a = b.repair(a);
      break;
    case "attack":
      a = b.attack(a);
      break;
    default:
      return new outcomes.TaskError("Bad mode " + d)
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
}, dismantle:function(c, b) {
  b.add_flag("no_autopickup");
  var a = Game.getObjectById(c.target_id);
  if(!a) {
    return new outcomes.Failure("No target found.")
  }
  if(b.carryCapacity && b.is_full()) {
    return new outcomes.PushTask({type:"deposit"})
  }
  var d = b.dismantle(a);
  switch(d) {
    case ERR_NOT_IN_RANGE:
      return b.moveTo(a), new outcomes.InProgress;
    case OK:
      return new outcomes.InProgress;
    default:
      return new outcomes.TaskError(d)
  }
}, leave_location:function(c, b) {
  var a = util.memoryPosition(c.pos);
  return b.pos.isEqualTo(a) ? (b.say("Aaaaaa!"), b.move(Math.floor(8 * Math.random() + 1)), new outcomes.InProgress) : new outcomes.AlreadyComplete
}, move_to:function(c, b) {
  var a = Game.getObjectById(c.target_id), a = a ? a.pos : util.memoryPosition(c.destination_pos);
  return!a ? new outcomes.TaskError("No destination found.") : b.pos.isEqualTo(a) ? new outcomes.AlreadyComplete : b.moveTo(a) === ERR_NO_PATH ? new outcomes.Failure("No path found.") : new outcomes.InProgress
}, suicide:function(c, b) {
  b.suicide();
  return new outcomes.Complete
}, recycle:function(c, b) {
  var a = Game.getObjectById(c.spawn_id);
  if(!a) {
    var a = [], d;
    for(d in Game.spawns) {
      a.push(Game.spawns[d])
    }
    if(a = b.pos.findClosestByPath(a)) {
      c.spawn_id = a.id
    }
  }
  return!a ? (b.suicide(), new outcomes.Complete) : a.recycleCreep(b) === ERR_NOT_IN_RANGE ? (b.moveTo(a), new outcomes.InProgress) : new outcomes.Complete
}, pickup:function(c, b) {
  if(b.is_full()) {
    return new outcomes.AlreadyComplete
  }
  var a = Game.getObjectById(c.target_id);
  if(!a) {
    return new outcomes.Failure("No target found.")
  }
  var d = b.pickup(a);
  return d === ERR_NOT_IN_RANGE ? (b.moveTo(a), new outcomes.InProgress) : d === ERR_INVALID_TARGET ? new outcomes.Failure(d) : new outcomes.Complete
}, travel_to_room:function(c, b) {
  var a = c.destination_room, d = b.room.name;
  if(!a) {
    return new outcomes.TaskError("No room given.")
  }
  if(d === a) {
    return new outcomes.AlreadyComplete
  }
  if(!c.route) {
    a = Game.map.findRoute(d, a);
    if(a === ERR_NO_PATH) {
      return new outcomes.Failure("No path to destination.")
    }
    c.route = a;
    c.route_index = 0
  }
  d = c.route[c.route_index];
  c.route_index += 1;
  a = d.room;
  return(d = b.pos.findClosestByPath(d.exit)) ? new outcomes.PushTask({type:"move_to_exit", destination:d, destination_room:a}) : new outcomes.Failure("No path to exit.")
}, move_to_exit:function(c, b) {
  var a = util.memoryPosition(c.destination), d = c.destination_room, e = b.room.name;
  if(d === e || b.pos === a) {
    return new outcomes.AlreadyComplete
  }
  if(!a || !d || a.roomName !== e) {
    return new outcomes.TaskError("Invalid destination/room")
  }
  b.moveTo(a);
  return new outcomes.InProgress
}, taskless:function(c, b) {
  var a = b.body_part_count(WORK), d = b.body_part_count(CARRY), a = b.body_part_count(CLAIM) ? "role_claimer" : !a && !d ? "role_dumbscout" : a && !d ? "role_cow" : !a && d ? "role_supplier" : _.sample(["role_supplier", "role_cow", "role_upgrader", "role_builder"]);
  return new outcomes.ReplaceTask({type:a})
}, idle:function(c, b) {
  b.say("Zzz");
  return new outcomes.InProgress
}, deposit:function(c, b) {
  var a = c.resource_type || RESOURCE_ENERGY;
  if(b.is_empty()) {
    return new outcomes.AlreadyComplete
  }
  var d = c.target_room;
  if(!d) {
    (d = b.get_support()) || (d = _.sample(Game.spawns));
    if(!d) {
      return new outcomes.TaskError("No spawns exist.")
    }
    d = d.room.name;
    c.target_room = d
  }
  b.drop(a);
  return new outcomes.TaskError("Could not find storage.")
}};
module.exports = {globals:require("task_manager.globals"), outcomes:require("task_manager.globals").outcomes, task_functions:task_functions, register:function(c) {
  if("function" !== typeof c) {
    throw"Non-function registered.";
  }
  var b = c.name;
  if(!b) {
    throw"Unnamed task function.";
  }
  task_functions[b] = c
}, get:function(c) {
  return task_functions[c]
}, run_task_queue:function(c) {
  if(c.has_tasks()) {
    for(var b = c.get_memory(), a = b.task_queue, d = 100, e = 0;a && a.length && e < a.length && 0 >= d;) {
      d--;
      a = a[e];
      "undefined" === typeof a.times_run && (a.times_run = 0);
      var g = a.type, f, h = cpu_tracker.start("tasks", g), k = task_functions[g];
      if(k) {
        try {
          f = k(a, c)
        }catch(l) {
          console.log(l.stack), f = new outcomes.TaskError("Exception: " + l)
        }
      }else {
        f = new outcomes.TaskError("No handler for task type.")
      }
      cpu_tracker.stop(h);
      f && f.outcome && (f = new outcomes.TaskError("Outcome is old format."));
      f || (f = new outcomes.TaskError("No outcome returned."));
      a.times_run >= a.timeout && (f.pop = !0);
      f.pop && c.pop_task();
      f.increment && (a.times_run += f.increment);
      f.push && c.add_task(f.push);
      f.next && (e += 1);
      f.warning && c.warning("task", f.warning);
      f.error && (a = "Task(" + g + "): " + f.error, console.log(a), c.error("task", a));
      if(f.stop) {
        break
      }
      a = b.task_queue
    }
    0 === d && cpu_debug("Task queue sanity timed out for " + c)
  }
}};

