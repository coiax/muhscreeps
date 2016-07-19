// vim: syntax=screeps tabstop=8 softtabstop=0 expandtab shiftwidth=4 smarttab

module.exports = {
    run : function() {
        if (typeof Memory.muhid !== 'undefined') {
            // the variable is defined
            Memory.muhid = 1;
        }
        // Mother; maintains population of colony.
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
        var harvesters = _.filter(Game.creeps, function(creep)
            {return creep.memory.role == 'harvester'});
        if(harvesters.length < 5) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        }
        var upgraders = _.filter(Game.creeps, function(creep)
            {return creep.memory.role == 'upgrader'});
        if(upgraders.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        }
    }
}
