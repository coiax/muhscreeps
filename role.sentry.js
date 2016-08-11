'use strict';var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.globals.outcomes, role_name = "role.sentry";
function room_has_sentry(b, c) {
  var a = Game.rooms[b];
  if(!a) {
    return!1
  }
  if(a.controller && a.controller.owner && a.controller.owner.username === c) {
    return!0
  }
  var a = a.find(FIND_MY_CREEPS), a = util.get_creeps_with_task(a, role_name), d;
  for(d in a) {
    if(a[d].has_task_in_queue(role_name).on_watch) {
      return!0
    }
  }
  return!1
}
module.exports.name = role_name;
module.exports.parts = [[MOVE]];
module.exports.run = function(b, c) {
  if(b.on_watch) {
    return new outcomes.InProgress
  }
  var a = c.room.roomName, d = c.owner.username;
  if(!b.sentry_roomname) {
    var e = util.room_walk(c.room.name, function(a) {
      return!room_has_sentry(a, d)
    });
    if(!e.length) {
      return new outcomes.Failure("No sentryless rooms found.")
    }
    b.sentry_roomname = e[0]
  }
  if(b.sentry_roomname && b.sentry_roomname !== a) {
    return new outcomes.PushTask({type:"travel_to_room", destination_room:b.sentry_roomname})
  }
  if(room_has_sentry(b.sentry_roomname, d)) {
    return b.sentry_roomname = void 0, new outcomes.Rerun
  }
  b.on_watch = !0;
  return new outcomes.InProgress
};
task_manager.register(module.exports.name, module.exports.run);

