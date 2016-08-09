var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports = {name:"role.dumbscout", parts:[[MOVE]], run:function(f, c) {
  c.notifyWhenAttacked(!1);
  for(var b = Game.map.describeExits(c.room.name), d, a;b.length && !a;) {
    var e = _.sample(Object.keys(b));
    d = b[e];
    d == f.old_room && 1 != b.length || (delete b[e], a = parseInt(e), a = c.pos.findClosestByPath(a))
  }
  return!a ? new outcomes.Failure("Cannot reach any exits.") : new outcomes.PushTask({type:"move_to_exit", destination:a, destination_room:d})
}};
require("task_manager").register(module.exports.name, module.exports.run);

