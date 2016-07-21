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

Creep.prototype.renewCost = function() {
    return floor(600 / this.body.length);
};

module.exports = {
    harvest : function(task, creep) {
        if(creep.carryCapacity == creep.carry.energy) {
            return {outcome: "done"};
        }
        var selected = Game.getObjectById(task.selected_source_id);
        if(!selected) {
            selected = creep.pos.findClosestByPath(FIND_SOURCES);
            if(selected) {
                task.selected_source_id = selected.id;
            }
        }
        if(!selected) {
            creep.say("!sr?:(");
            return {outcome: "replace", task: {type: "resupply"}};
        }
        var rv = creep.harvest(selected);
        if(rv == ERR_NOT_IN_RANGE) {
            creep.moveTo(selected);
            return {outcome: "continue"};
        }
        if(creep.carryCapacity == creep.carry.energy) {
            return {outcome: "done"};
        } else {
            return {outcome: "continue"};
        }
    },
    construct : function(task, creep) {
        var resupply = task.resupply;
        var target = Game.getObjectById(task.target_id);
        if(!target) {
            creep.say("cs ?!?");
            return {outcome: "done"};
        }
        if(creep.carry.energy == 0) {
            if(resupply) {
                return {outcome: "newtask", task: {type: resupply}};
            } else {
                return {outcome: "done"};
            }
        }
        var rv;
        if(typeof target.progress == 'undefined') {
            if(target.hits == target.hitsMax) {
                return {outcome: "done"};
            }
            rv = creep.repair(target);
        } else {
            rv = creep.build(target);
        }
        if(rv == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return {outcome: "continue"};
    },
    resupply : function(task, creep) {
        var remaining_capacity = creep.carryCapacity - creep.carry.energy;
        if(remaining_capacity == 0) {
            return {outcome: "done"};
        }
        var gas_station = Game.getObjectById(task.gas_station_id);
        if(!gas_station) {
            var possible_stations = creep.room.find(FIND_STRUCTURES, {
                filter: function(st) {
                    if(st.structureType != STRUCTURE_CONTAINER) {
                        return false;
                    }
                    var energy_stored = st.store[RESOURCE_ENERGY];
                    return energy_stored < remaining_capacity;
            }});
            if(possible_stations.length) {
                gas_station = creep.pos.findClosestByPath(possible_stations);
                task.gas_station_id = gas_station.id;
            }
        }
        if(!gas_station) {
            return {outcome: "replace", task: {type: "harvest"}};
        }
        var rc = creep.withdraw(gas_station, RESOURCE_ENERGY);
        if(rc == ERR_NOT_IN_RANGE) {
            creep.moveTo(gas_station);
            return {outcome: "continue"};
        } else if(rc != OK) {
            creep.say("rs" + rc);
            return {outcome: "continue"};
        } else {
            return {outcome: "done"};
        }
    },
    renew : function(task, creep) {
        if(creep.ticksToLive >= 1400) {
            return {outcome: "done"};
        }
        var spawn = Game.getObjectById(task.spawn_id);
        if(!spawn) {
            spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            if(spawn)
                task.spawn_id = spawn.id
        }
        if(!spawn) {
            creep.say("SPN?!?");
            return {outcome: "done"};
        }
        var rc = spawn.renewCreep(creep)
        creep.transfer(spawn, RESOURCE_ENERGY);
        if(rc == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn)
            return {outcome: "continue"};
        } else if((rc == ERR_FULL) || (rc == ERR_NOT_ENOUGH_ENERGY)) {
            return {outcome: "done"};
        }
        return {outcome: "continue"};
    }
}
