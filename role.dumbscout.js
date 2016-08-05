var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports = {name:"role.dumbscout", parts:[[MOVE]], run:function(a, c) {
  c.notifyWhenAttacked(!1);
  var d = c.room.name, b = util.memoryPosition(a.exit_pos);
  if(d != a.destination_room) {
    if(b) {
      return a.old_room = d, c.moveTo(b), new outcomes.InProgress
    }
    a.destination_room = null
  }else {
    c.say("Ding!"), a.destination_room = null, a.exit_pos = null
  }
  if(!a.destination_room) {
    var d = Game.map.describeExits(d), b = [], e;
    for(e in d) {
      b.push(e)
    }
    for(var g, f;b.length && !f;) {
      e = _.sample(b), g = d[e], g == a.old_room && 1 != b.length || (_.pull(b, e), f = parseInt(e), f = c.pos.findClosestByRange(f))
    }
    if(f) {
      return a.destination_room = g, a.exit_pos = f, new outcomes.Rerun
    }
    c.say("bluh");
    return new outcomes.InProgress
  }
}};
require("task_manager").register(module.exports.name, module.exports.run);

