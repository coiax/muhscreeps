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
        if(harvesters.length < 2) {
            var id = 'Spawn' + Memory.muhid;
            Memory.muhid++;
            var newName = Game.spawns[id].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
    }
}
