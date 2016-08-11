'use strict';StructureSpawn.prototype.get_memory = function() {
  return this.memory
};
StructureSpawn.prototype.check_creeps = function() {
  this.memory.supported_creeps && (_.remove(this.memory.supported_creeps, function(a) {
    return!Game.creeps[a]
  }), 0 === this.memory.supported_creeps.length && (this.memory.supported_creeps = void 0))
};

