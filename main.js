var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var mother = require('mother');

module.exports.loop = function () {
    mother.run();

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure)
                {return structure.hits < structure.hitsMax}
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        for(var i in Game.spawns) {
            var old_ttl = creep.ticksToLive.valueOf();
            var code = Game.spawns[i].renewCreep(creep);
            var new_ttl = creep.ticksToLive.valueOf();
            if(code == OK && (old_ttl != new_ttl)) {
                creep.say(old_ttl + "->" + new_ttl);
            }
        }
    }
}
