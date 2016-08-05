var util = require("util"), task_manager = require("task_manager");
module.exports = {name:"role.distantminer", run:function(a, c) {
  "undefined" == typeof a.mode && (a.mode = "locate");
  return module.exports[a.mode](a, c)
}, locate:function(a, c) {
  var b = Game.spawns[c.support];
  if(!b) {
    return c.find_support(), {outcome:"rerun"}
  }
  var e = b.room.roomName, b = util.room_walk(e, function(a, b) {
    if(b == e) {
      return!1
    }
    var d = Game.rooms[b];
    if(d) {
      return d.find(FIND_SOURCES, {filter:function(a) {
        return a.is_harvestable(c)
      }}).length
    }
    d = Memory.rooms[b].intel;
    if(!d) {
      return!1
    }
    if(d.sources.length) {
      return!0
    }
  });
  return b.length ? (a.target_room = b[0], a.mode = "travel_to", {outcome:"rerun"}) : {outcome:"continue"}
}, travel_to:function(a, c) {
}};
require("task_manager").register(module.exports.name, module.exports.run);

