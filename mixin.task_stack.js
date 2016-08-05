module.exports.add_task = function(a) {
  var b = this.get_memory();
  b.task_queue || (b.task_queue = []);
  b.task_queue.unshift(a)
};
module.exports.pop_task = function() {
  var a = this.get_memory();
  a.task_queue && (a.task_queue.shift(), 0 == a.task_queue.length && (a.task_queue = void 0))
};
module.exports.has_task_in_queue = function(a) {
  var b = this.get_memory().task_queue;
  if(!b) {
    return null
  }
  for(var d in b) {
    var c = b[d];
    if(a == c.type) {
      return c
    }
  }
  return null
};
module.exports.has_tasks = function() {
  var a = this.get_memory();
  return a.task_queue && a.task_queue.length ? !0 : !1
};

