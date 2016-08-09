var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes;
module.exports.name = "role.distantminer";
module.exports.run = function(c, d) {
  var b = util.room_walk(d.room.name, function(c, b) {
    var a = Game.rooms[b];
    if(a) {
      return a.find(FIND_SOURCES, {filter:function(a) {
        return a.is_harvestable(d)
      }}).length
    }
    a = Memory.rooms[b].intel;
    if(!a) {
      return!1
    }
    if(a.sources && a.sources.length) {
      return!0
    }
  });
  return b.length ? (c.target_room = b[0], c.mode = "travel_to", {outcome:"rerun"}) : new outcomes.Failure("No suitable mining sites found.")
};
require("task_manager").register(module.exports.name, module.exports.run);

