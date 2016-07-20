Creep.prototype.add_task = function(obj) {
    if(!this.memory.task_queue) {
        this.memory.task_queue = [];
    }
    this.memory.task_queue.unshift(obj);
};

Creep.prototype.pop_task = function() {
    this.memory.task_queue = _.drop(this.memory.task_queue);
    if(this.memory.task_queue.length == 0) {
        this.memory.task_queue = undefined;
    }
};

module.exports = {
    harvest : function(creep) {
        if(creep.carryCapacity == creep.carry.energy) {
            return true;
        }
        var sources = creep.room.find(FIND_SOURCES);
        var selected = sources[0];
        var rv = creep.harvest(selected);
        if(rv == ERR_NOT_IN_RANGE) {
            creep.moveTo(selected);
            return false;
        }
        if(creep.carryCapacity == creep.carry.energy) {
            return true;
        } else {
            return false;
        }
    },
    construct : function(creep, target_id, resupply) {
        var target = Game.getObjectById(target_id);
        if(!target) {
            creep.say("cs ?!?");
            return true;
        }
        if(creep.carry.energy == 0) {
            if(resupply) {
                creep.add_task({type: "harvest"})
                return false;
            } else {
                return true;
            }
        }
        if(typeof target.progress == 'undefined') {
            if(target.hits == target.hitsMax) {
                return true;
            }
        }
        var rv = creep.repair(target);
        if(rv == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return false;
    }
}
