Creep.prototype.add_task = function(obj) {
    if(typeof this.memory.task_queue == 'undefined') {
        this.memory.task_queue = [];
    }
    this.memory.task_queue.unshift(obj);
};

Creep.prototype.pop_task = function() {
    this.memory.task_queue = _.drop(this.memory.task_queue);
    if(this.memory.task_queue.length == 0) {
        this.memory.task_queue = null;
    }
};

module.exports = {
    harvest : function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var selected = sources[0];
        var rv = creep.harvest(selected);
        if(rv == ERR_NOT_IN_RANGE) {
            creep.moveTo(selected);
        }
        if(creep.carryCapacity == creep.carry.energy) {
            return TRUE;
        } else {
            return FALSE;
        }
    },
    construct : function(creep, target_id, resupply) {
        var target = Game.getObjectById(target_id);
        if(!target) {
            creep.say("cs ?!?");
            return TRUE;
        }
        if(creep.carry.energy == 0) {
            if(resupply) {
                creep.add_task({type: "harvest"})
                return FALSE;
            } else {
                return TRUE;
            }
        }
        if(target.hits == target.hitsMax) {
            return TRUE;
        }
        var rv = creep.repair(target);
        if(rv == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return FALSE;
    }
}
