var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports = {name:"role.dumbscout", parts:[[MOVE]], run:function(c, d) {
  d.notifyWhenAttacked(!1);
  for(var g = d.room.name, a = Game.map.describeExits(g), e, b;a.length && !b;) {
    console.log(JSON.stringify(a));
    var f = _.sample(Object.keys(a));
    e = a[f];
    if(!c.old_room || !(e == c.old_room && 1 != a.length)) {
      delete a[f], b = parseInt(f), b = d.pos.findClosestByPath(b)
    }
  }
  if(!b) {
    return new outcomes.Failure("Cannot reach any exits.")
  }
  a = {type:"move_to_exit", destination:b, destination_room:e};
  c.old_room = g;
  return new outcomes.PushTask(a)
}};
require("task_manager").register(module.exports.name, module.exports.run);

