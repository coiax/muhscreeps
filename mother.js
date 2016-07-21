function minimum_creeps(role, amount) {
    var creeps = _.filter(Game.creeps, function(creep)
        {return creep.memory.role == role});
    if(creeps.length < amount) {
        var newMuhid = Memory.muhid;
        var proposedName = role + newMuhid;
        var parts;
        var spawn = Game.spawns['Spawn2']
        var capacity = spawn.room.energyCapacityAvailable;
        if(capacity >= 400) {
            if(role == "guard") {
                parts = [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE];
            } else {
                parts = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
            }
        } else {
            if(role == "guard") {
                parts = [RANGED_ATTACK, MOVE];
            } else {
                parts = [WORK,CARRY,MOVE];
            }
        }
        var newName = spawn.createCreep(parts, proposedName, {role: role});
        if(newName == proposedName) {
            Memory.muhid++;
        }
    }
}

module.exports = {
    run : function() {
        if (typeof Memory.muhid == 'undefined') {
            Memory.muhid = 1;
        }
        // Mother; maintains population of colony.
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
        // Apparently the last issued order is the highest priority
        minimum_creeps('guard', 2);
        minimum_creeps('builder', 2);
        minimum_creeps('upgrader', 4);
        minimum_creeps('harvester', 2);
        minimum_creeps('cow', 4);
    }
}
