var genericActions = require('genericactions');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCow = require('role.cow');
var mother = require('mother');

module.exports.loop = function () {
    mother.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var tq = creep.memory.task_queue;
        if(tq && tq.length) {
            var task = tq[0];
            if(task.type == 'harvest') {
                var success = genericActions.harvest(creep);
                if(success)
                    creep.pop_task();
            }
            else if(task.type == 'construct') {
                var target_id = task.target;
                var resupply = task.resupply;
                var success = genericActions.construct(creep, target_id,
                    resupply);
                if(success)
                    creep.pop_task();
            }
            if(tq && tq.length) {
                continue;
            }
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'cow') {
            roleCow.run(creep);
        }
    }
}
