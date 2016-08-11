'use strict';var task_manager = require("task_manager"), outcomes = task_manager.outcomes;
function role_upgrader(b, a) {
  if(0 === a.carry.energy) {
    return new outcomes.PushTask({type:"resupply"})
  }
  a.upgradeController(a.room.controller) === ERR_NOT_IN_RANGE && a.moveTo(a.room.controller);
  return new outcomes.InProgress
}
task_manager.register(role_upgrader);

