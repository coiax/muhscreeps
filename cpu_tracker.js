var util = require("util");
function setup() {
  Memory.cpu || (Memory.cpu = {enabled:!1, values_kept:1E3});
  "undefined" == typeof Memory.cpu.enabled && (Memory.cpu.enabled = !1);
  Memory.cpu.values_kept || (Memory.cpu.values_kept = 1E3)
}
function add_value(a, b) {
  a.push(b);
  util.keep_n_values(a, Memory.cpu.values_kept)
}
function calculate_average(a) {
  var b = 0;
  return a ? (a.forEach(function(a) {
    b += a.used
  }), b / a.length) : 0
}
function record(a, b) {
  var c = Game.time;
  a.values || (a.values = []);
  add_value(a.values, {time:c, used:b});
  a.last = b
}
function get_values(a) {
  return a.values ? _.map(a.values, _.property("used")) : null
}
var paths = {};
function record_arbitary(a, b, c) {
  setup();
  if(Memory.cpu.enabled) {
    if(Memory.cpu[a] || (Memory.cpu[a] = {}), b) {
      var d = a + "." + b;
      paths[d] || (paths[d] = 0);
      paths[d]++;
      Memory.cpu[a][b] || (Memory.cpu[a][b] = {});
      record(Memory.cpu[a][b], c)
    }else {
      paths[a] || (paths[a] = 0), paths[a]++, record(Memory.cpu[a], c)
    }
  }
}
function start(a, b) {
  var c = {};
  c.time_started = Game.cpu.getUsed();
  c.arbitary = a;
  c.task_name = b;
  return c
}
function stop(a) {
  var b = Game.cpu.getUsed();
  a && ("undefined" != typeof a.time_started && "undefined" != typeof a.arbitary && "undefined" != typeof a.task_name) && record_arbitary(a.arbitary, a.task_name, b - a.time_started)
}
module.exports = {record_arbitary:record_arbitary, record_main:function() {
  return record_arbitary("main", null, Game.cpu.getUsed())
}, record_task:function(a, b) {
  return record_arbitary("tasks", a, b)
}, calculate:function() {
  for(var a in paths) {
    var b = paths[a], c = _.get(Memory.cpu, a);
    if(c) {
      var d = get_values(c), d = util.standard_deviation_and_mean(d);
      c.avg = d.avg;
      c.std = d.std;
      c.times_run = b;
      c.mavg = b * d.avg
    }
  }
  paths = {}
}, start:start, stop:stop};

