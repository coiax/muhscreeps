'use strict';var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.outcomes;
function is_suitable_room(a) {
  var b = Game.rooms[a];
  a = util.room_intel(a);
  return!a || a.controller && a.controller.level ? !1 : b ? b.controller && b.controller.level ? !1 : b.find(FIND_SOURCES, {filter:function(a) {
    return a.is_harvestable()
  }}).length : a.sources && a.sources.length ? !0 : !1
}
function role_distantminer(a, b) {
  var c = b.room.name, d = util.room_walk(c, is_suitable_room);
  return d.length ? (c = d[0] === c ? {type:"role.cow"} : {type:"travel_to_room", destination_room:_.sample(d)}, new outcomes.PushTask(c)) : new outcomes.Failure("No suitable mining sites found.")
}
task_manager.register(role_distantminer);

