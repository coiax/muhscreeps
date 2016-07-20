// vim: syntax=screeps tabstop=8 softtabstop=0 expandtab shiftwidth=4 smarttab

function minimum_creeps(role, amount) {
    var creeps = _.filter(Game.creeps, function(creep)
        {return creep.memory.role == role});
    if(creeps.length < amount) {
        var newMuhid = Memory.muhid;
        var proposedName = role + newMuhid;
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], proposedName, {role: role});
        if(newName == proposedName) {
            Memory.muhid++;
        }
    }
}

module.exports = {
    run : function() {
        if (typeof Memory.muhid == 'undefined') {
            // the variable is defined
            Memory.muhid = 1;
        }
        // Mother; maintains population of colony.
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
        minimum_creeps('harvester', 2)
        minimum_creeps('upgrader', 4)
        minimum_creeps('builder', 2)
    }
}
