function needs_energy(a) {
  return!a.isActive() ? !1 : a.store ? _.sum(a.store) < a.storeCapacity : "undefined" == typeof a.energy || "undefined" == typeof a.energyCapacity ? !1 : a.energy < a.energyCapacity
}
function is_damaged(a) {
  return"undefined" == typeof a.hits || "undefined" == typeof a.hitsMax ? !1 : a.hits < a.hitsMax
}
function cpulog(a) {
  console.log(Game.cpu.getUsed() + " " + a)
}
function mean(a) {
  return _.sum(a) / a.length
}
function standard_deviation_and_mean(a) {
  var b = mean(a), c = 0;
  a.forEach(function(a) {
    c += Math.pow(a - b, 2)
  });
  c /= a.length;
  a = Math.pow(c, 0.5);
  return{avg:b, std:a}
}
function room_walk(a, b, c) {
  c = c && c.maximum_depth || 10;
  var d = 0, e = {};
  a = [a];
  for(var f = [], g = [];0 == f.length && d < c;) {
    a.forEach(function(a) {
      if(!e[a]) {
        if(e[a] = !0, b(a, d)) {
          f.push(a)
        }else {
          exits = Game.map.describeExits(a);
          for(var c in exits) {
            a = exits[c], e[a] || g.push(a)
          }
        }
      }
    }), d++, a = g, g = []
  }
  return f
}
module.exports = {room_walk:room_walk, opposite_dir:function(a) {
  a += 4;
  8 < a && (a -= 8);
  return a
}, body_cost:function(a) {
  var b = 0;
  a.forEach(function(a) {
    b += BODYPART_COST[a]
  });
  return b
}, needs_energy:needs_energy, is_damaged:is_damaged, cpulog:cpulog, mean:mean, standard_deviation_and_mean:standard_deviation_and_mean, memoryPosition:function(a) {
  return a ? new RoomPosition(a.x, a.y, a.roomName) : null
}, get_creeps_with_task:function(a, b) {
  return _.filter(a, function(a) {
    return a.has_task_in_queue(b)
  })
}, keep_n_values:function(a, b) {
  a && a.length > b && a.splice(0, a.length - b)
}, cpu_debug:function(a) {
  Memory.config.cpu_debug && console.log(Game.cpu.getUsed() + ": " + a)
}, room_intel:function(a) {
  return Memory.rooms[a] ? Memory.rooms[a].intel : null
}};

