'use strict';var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.outcomes, default_parts = [];
function generate_default_parts() {
  for(var a = 1;;) {
    var c = [], b;
    for(b = 0;b < a;b++) {
      c.push(WORK)
    }
    for(b = 0;b < a;b++) {
      c.push(CARRY)
    }
    for(b = 0;b < a;b++) {
      c.push(MOVE)
    }
    if(50 >= c.length) {
      default_parts.push(c), a++
    }else {
      break
    }
  }
}
generate_default_parts();
function build_creep(a, c, b) {
  var e;
  c.currently_attempting = b;
  var g = task_manager.get(b);
  e = default_parts;
  g && g.parts && (e = g.parts);
  var g = a.room.energyAvailable, d, f;
  for(f in e) {
    var h = e[f];
    if(util.body_cost(h) <= g) {
      d = h
    }else {
      break
    }
  }
  if(d) {
    for(e = b.replace(".", "_") + c.creep_id;;) {
      if(f = a.canCreateCreep(d, e), f === OK) {
        c.currently_spawning = b;
        break
      }else {
        if(f === ERR_NAME_EXISTS) {
          c.creep_id++
        }else {
          return
        }
      }
    }
    c.creep_id++;
    a.createCreep(d, e, {task_queue:[{type:b}]});
    a.memory.supported_creeps || (a.memory.supported_creeps = []);
    a.memory.supported_creeps.push(e)
  }
}
function setup(a, c) {
  "undefined" === typeof a.creep_id && (a.creep_id = 1);
  a.currently_attempting = null;
  c.spawning || (a.currently_spawning = null)
}
var default_required = [{task:"role_supplier", amount:1}, {task:"role_cow", amount:1}, {task:"role_upgrader", amount:1}, {task:"role_builder", amount:1}, {task:"role_cow", amount:2}, {task:"role_supplier", amount:2}, {task:"role_cow", amount:3}, {task:"role_supplier", amount:3}, {task:"role_cow", amount:4}, {task:"role_supplier", amount:4}, {task:"role_upgrader", amount:3}, {task:"role_builder", amount:4}, {task:"role_dumbscout", amount:10}, {task:"role_claimer", amount:1}];
function structure_spawner(a, c) {
  setup(a, c);
  c.check_creeps();
  var b = {}, e = c.memory.supported_creeps || [];
  a.required || (a.required = _.cloneDeep(default_required));
  for(var g in a.required) {
    var d = a.required[g];
    if("undefined" === typeof b[d.task]) {
      for(var f = b[d.task] = 0;f < e.length;f++) {
        Game.creeps[e[f]].has_task_in_queue(d.task) && b[d.task]++
      }
    }
    if(b[d.task] < d.amount) {
      build_creep(c, a, d.task);
      break
    }
  }
  return new outcomes.InProgress
}
task_manager.register(structure_spawner);

