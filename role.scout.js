var util = require("util");
function setup(a, b) {
}
function remove_visited(a, b) {
  var c = [], d;
  for(d in a) {
    var e = a[d];
    _.includes(b, e) || c.push(e)
  }
  return c
}
module.exports = {name:"role.scout", parts:[[MOVE], [MOVE, HEAL], [TOUGH, MOVE, MOVE, HEAL], [TOUGH, TOUGH, MOVE, MOVE, MOVE, HEAL], [TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, HEAL]], run:function(a, b) {
  setup(a, b);
  var c = Game.map.describeExits(b.room.name);
  remove_visited(c, [])
}};
require("task_manager").register(module.exports.name, module.exports.run);

