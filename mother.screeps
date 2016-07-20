// vim: syntax=screeps tabstop=8 softtabstop=0 expandtab shiftwidth=4 smarttab

function minimum_creeps(role, amount) {
    var creeps = _.filter(Game.creeps, function(creep)
        {return creep.memory.role == role});
    if(creeps.length < amount) {
        var newMuhid = Memory.muhid;
        Memory.muhid++;
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], role + newMuhid, {role: role});
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
        minimum_creeps('upgrader', 2)
        minimum_creeps('builder', 2)
    }
}
