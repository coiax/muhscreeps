var task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes, roleUpgrader = {name:"role.upgrader", run:function(b, a) {
  if(0 == a.carry.energy) {
    return new outcomes.PushTask({type:"resupply"})
  }
  a.upgradeController(a.room.controller) == ERR_NOT_IN_RANGE && a.moveTo(a.room.controller);
  return new outcomes.InProgress
}};
module.exports = roleUpgrader;
task_manager.register(roleUpgrader.name, roleUpgrader.run);

