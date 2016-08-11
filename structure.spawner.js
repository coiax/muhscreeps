'use strict';var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
function generate_default_parts() {
  for(var a = 1;;) {
    for(var c = [], b = 0;b < a;b++) {
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
var default_parts = [];
generate_default_parts();
function build_creep(a, c, b) {
  var d, f;
  c.currently_attempting = b;
  try {
    f = require(b)
  }catch(e) {
    console.log("Error importing task '" + b + "': " + e)
  }
  d = default_parts;
  f && f.parts && (d = f.parts);
  f = a.room.energyAvailable;
  var h, g;
  for(g in d) {
    var k = d[g];
    if(util.body_cost(k) <= f) {
      h = k
    }else {
      break
    }
  }
  if(h) {
    for(d = b.replace(".", "_") + c.creep_id;;) {
      if(g = a.canCreateCreep(h, d), g == OK) {
        c.currently_spawning = b;
        break
      }else {
        if(g == ERR_NAME_EXISTS) {
          c.creep_id++
        }else {
          return
        }
      }
    }
    c.creep_id++;
    a.createCreep(h, d, {task_queue:[{type:b}]});
    a.memory.supported_creeps || (a.memory.supported_creeps = []);
    a.memory.supported_creeps.push(d)
  }
}
function setup(a, c) {
  "undefined" == typeof a.creep_id && (a.creep_id = 1);
  a.currently_attempting = null;
  c.spawning || (a.currently_spawning = null)
}
var default_required = [{task:"role.supplier", amount:1}, {task:"role.cow", amount:1}, {task:"role.upgrader", amount:1}, {task:"role.builder", amount:1}, {task:"role.cow", amount:2}, {task:"role.supplier", amount:2}, {task:"role.cow", amount:3}, {task:"role.supplier", amount:3}, {task:"role.cow", amount:4}, {task:"role.supplier", amount:4}, {task:"role.upgrader", amount:3}, {task:"role.builder", amount:4}, {task:"role.dumbscout", amount:10}, {task:"role.sentry", amount:4}, {task:"role.claimer", amount:1}];
module.exports = {name:"structure.spawner", run:function(a, c) {
  setup(a, c);
  c.check_creeps();
  var b = {}, d = c.memory.supported_creeps || [];
  a.required || (a.required = _.cloneDeep(default_required));
  for(var f in a.required) {
    var e = a.required[f];
    "undefined" == typeof b[e.task] && (b[e.task] = 0, d.forEach(function(a) {
      Game.creeps[a].has_task_in_queue(e.task) && b[e.task]++
    }));
    if(b[e.task] < e.amount) {
      build_creep(c, a, e.task);
      break
    }
  }
  return new outcomes.InProgress
}};
task_manager.register(module.exports.name, module.exports.run);

