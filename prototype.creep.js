var util = require("util");
_.extend(Creep.prototype, require("mixin.log"));
_.extend(Creep.prototype, require("mixin.task_stack"));
_.extend(Structure.prototype, require("mixin.common"));
Creep.prototype.get_memory = function() {
  return this.memory
};
Creep.prototype.wants_renew = function() {
  return 100 > this.ticksToLive && this.has_flag("renew") && !this.has_task_in_queue("renew") ? !0 : !1
};
Creep.prototype.renew_cost = function() {
  return floor(600 / this.body.length)
};
Creep.prototype.body_cost = function() {
  var a = [];
  this.body.forEach(function(b) {
    a.push(b.type)
  });
  return util.body_cost(a)
};
Creep.prototype.body_part_count = function(a, b) {
  var c = 0;
  this.body.forEach(function(d) {
    d.type == a && (!b || 100 == d.hits) && c++
  });
  return c
};
Creep.prototype.maintain_cost = function() {
  return _.includes(this.body, CLAIM) ? 0 : this.body_cost() / CREEP_LIFE_TIME
};
Creep.prototype.is_full = function() {
  return _.sum(this.carry) == this.carryCapacity
};
Creep.prototype.is_empty = function() {
  return 0 == _.sum(this.carry)
};
Creep.prototype.get_support = function() {
  for(var a in Game.spawns) {
    var b = Game.spawns[a];
    if(_.includes(b.memory.supported_creeps, this.name)) {
      return b
    }
  }
  return null
};
Creep.prototype.add_flag = function(a) {
  this.memory.flags || (this.memory.flags = []);
  _.includes(this.memory.flags, a) || this.memory.flags.push(a)
};
Creep.prototype.clear_flag = function(a) {
  this.memory.flags && (_.pull(this.memory, a), 0 == this.memory.flags.length && (this.memory.flags = void 0))
};
Creep.prototype.has_flag = function(a) {
  return this.memory.flags ? _.includes(this.memory.flags, a) : !1
};
Creep.prototype.debug_mode = function() {
  this.add_flag("no_autotask");
  this.memory.task_queue = void 0
};

