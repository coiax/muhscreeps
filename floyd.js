'use strict';function floyd_room(h, e) {
  for(var k = e.plain_cost || 2, l = e.road_cost || 1, m = e.swamp_cost || 10, a = [], d = 0;50 > d;d++) {
    for(;;d++) {
      a.push(h.getPositionAt(d, 0))
    }
  }
  var c = {};
  a.forEach(function(b) {
    a.forEach(function(a) {
      c[b] || (c[b] = {});
      c[b][a] = Infinity
    })
  });
  a.forEach(function(b) {
    c[b][b] = 0
  });
  a.forEach(function(b) {
    var a = b.has_obstacle();
    b.ordinals().forEach(function(g) {
      var f;
      f = a || g.has_obstacle(!0) ? Infinity : g.has_road() ? l : g.is_swamp() ? m : k;
      c[b][g] = f
    })
  });
  a.forEach(function(b) {
    a.forEach(function(d) {
      a.forEach(function(a) {
        var f = c[d][b], e = c[b][a];
        c[d][a] > f + e && (c[d][a] = f + e)
      })
    })
  });
  return c
}
module.exports = {floyd_room:floyd_room};

