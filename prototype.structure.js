'use strict';var util = require("util");
_.extend(Structure.prototype, require("mixin.log"));
_.extend(Structure.prototype, require("mixin.task_stack"));
_.extend(Structure.prototype, require("mixin.common"));
Structure.prototype.get_memory = function() {
  Memory.structures || (Memory.structures = {});
  var a = Memory.structures[this.id];
  if(a) {
    return a
  }
  Memory.structures[this.id] = {};
  return Memory.structures[this.id]
};
Structure.prototype.maintain_cost = function() {
  var a = 0, b = 0;
  switch(this.structureType) {
    case STRUCTURE_CONTAINER:
      a = CONTAINER_DECAY;
      b = this.room.controller && this.room.controller.owner ? CONTAINER_DECAY_TIME_OWNED : CONTAINER_DECAY_TIME;
      break;
    case STRUCTURE_RAMPART:
      a = RAMPART_DECAY_AMOUNT;
      b = RAMPART_DECAY_TIME;
      break;
    case STRUCTURE_ROAD:
      a = ROAD_DECAY_AMOUNT, this.pos.is_swamp() && (a *= CONSTRUCTION_COST_ROAD_SWAMP_RATIO), b = ROAD_DECAY_TIME
  }
  return 0 === a || 0 === b ? 0 : a / b * REPAIR_COST
};
Structure.prototype.is_type = function(a) {
  a.constructor !== Array && (a = [a]);
  return _.includes(a, this.structureType)
};
Structure.prototype.is_full = function() {
  return!this.isActive() ? null : this.store ? _.sum(this.store) === this.storeCapacity : "undefined" === typeof this.energy || "undefined" === typeof this.energyCapacity ? null : this.energy === this.energyCapacity
};
Structure.prototype.is_autorepairable = function() {
  return util.is_damaged(this) && this.is_type([STRUCTURE_ROAD, STRUCTURE_CONTAINER])
};

