var task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes, roleGuard = {name:"role.guard", run:function(c, a) {
  var b = a.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  b ? 3 >= a.pos.getRangeTo(b) ? (a.say("pew"), a.rangedAttack(b)) : a.moveTo(b) : (b = Game.flags.Campfire) && 3 < a.pos.getRangeTo(b) && a.moveTo(b);
  return outcomes.InProgress()
}, parts:[[RANGED_ATTACK, MOVE], [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE]]};
module.exports = roleGuard;
require("task_manager").register(module.exports.name, module.exports.run);

