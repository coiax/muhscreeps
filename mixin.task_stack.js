'use strict';module.exports.add_task = function(a) {
  var b = this.get_memory();
  b.task_queue || (b.task_queue = []);
  var c = a;
  "string" === typeof a && (c = {type:a});
  b.task_queue.unshift(c)
};
module.exports.pop_task = function() {
  var a = null, b = this.get_memory();
  b.task_queue && (a = b.task_queue.shift(), 0 === b.task_queue.length && (b.task_queue = void 0));
  return a
};
module.exports.has_task_in_queue = function(a) {
  var b = this.get_memory().task_queue;
  if(!b) {
    return null
  }
  for(var c in b) {
    var d = b[c];
    if(a === d.type) {
      return d
    }
  }
  return null
};
module.exports.has_tasks = function() {
  var a = this.get_memory();
  return a && a.task_queue && a.task_queue.length ? !0 : !1
};

