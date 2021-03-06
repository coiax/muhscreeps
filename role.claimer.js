'use strict';var util = require("util"), task_manager = require("task_manager"), outcomes = task_manager.outcomes, RESERVE_THRESHOLD = 4E3;
function reservable_controller(b, c) {
  var a = Memory.rooms[b];
  if(a && a.intel && (a = a.intel, a.controller && 0 === a.controller.level)) {
    if(a = a.controller, a.reservation) {
      if(a.reservation.username === c && a.reservation.ticksToEnd < RESERVE_THRESHOLD) {
        return!0
      }
    }else {
      return!0
    }
  }
  return!1
}
function role_claimer(b, c) {
  "undefined" === typeof b.full_claim && (b.full_claim = !1);
  var a = Game.getObjectById(b.controller_id), d = util.memoryPosition(b.destination_pos), e = c.room.name;
  if(!a && !d) {
    var f = c.owner.username, a = util.room_walk(e, function(a) {
      return reservable_controller(a, f)
    });
    if(!a.length) {
      return c.say("noclaim"), a = new outcomes.InProgress, a.error = "No rooms found.", a
    }
    a = _.sample(a);
    c.say(a);
    b.destination_pos = Memory.rooms[a].intel.controller.pos;
    return new outcomes.Rerun
  }
  if(!a && d) {
    if(d.roomName === e) {
      return b.controller_id = c.room.controller.id, new outcomes.Rerun
    }
    c.moveTo(d);
    return new outcomes.InProgress
  }
  if(a) {
    return b.destination = null, d = b.full_claim ? c.claimController(a) : c.reserveController(a), d === ERR_NOT_IN_RANGE ? (c.moveTo(a), new outcomes.InProgress) : d === ERR_INVALID_TARGET ? (b.controller = null, new outcomes.Rerun) : d === ERR_GCL_NOT_ENOUGH ? (b.full_claim = !1, new outcomes.Rerun) : new outcomes.InProgress
  }
}
role_claimer.parts = [[MOVE, CLAIM, CLAIM], [MOVE, MOVE, CLAIM, CLAIM]];
task_manager.register(role_claimer);

