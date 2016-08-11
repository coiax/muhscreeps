'use strict';var task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports = {name:"role.dumbscout", parts:[[MOVE]], run:function(f, c) {
  c.notifyWhenAttacked(!1);
  for(var g = c.room.name, a = Game.map.describeExits(g), d, b;!_.isEmpty(a) && !b;) {
    var e = _.sample(Object.keys(a));
    d = a[e];
    d === f.old_room && 1 !== _.size(a) || (delete a[e], b = parseInt(e), b = c.pos.findClosestByPath(b))
  }
  if(!b) {
    return new outcomes.Failure("Cannot reach any exits.")
  }
  a = {type:"move_to_exit", destination:b, destination_room:d};
  f.old_room = g;
  return new outcomes.PushTask(a)
}};
require("task_manager").register(module.exports.name, module.exports.run);

