var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports.name = "role.distantminer";
module.exports.run = function(e, c) {
  var b = util.room_walk(c.room.name, function(b, d) {
    var a = Game.rooms[d];
    if(a) {
      return a.find(FIND_SOURCES, {filter:function(a) {
        return a.is_harvestable(c)
      }}).length
    }
    a = Memory.rooms[d].intel;
    if(!a) {
      return!1
    }
    if(a.sources && a.sources.length) {
      return!0
    }
  });
  return b.length ? (b = {type:"travel_to_room", destination_room:_.sample(b)}, new outcomes.PushTask(b)) : new outcomes.Failure("No suitable mining sites found.")
};
require("task_manager").register(module.exports.name, module.exports.run);

