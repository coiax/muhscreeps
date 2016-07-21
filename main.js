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
        if(creep.spawning) {
            continue;
        }
        var tq = creep.memory.task_queue;
        if(tq && tq.length) {
            var task = tq[0];
            var ttype = task.type;
            var func = genericActions[ttype];

            var success = func(task, creep);
            if(success)
                creep.pop_task();
            if(tq && tq.length) {
                // Do not fall back to old roles if there are tasks in
                // the task queue.
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
        if(creep.memory.role == 'guard') {
            roleGuard.run(creep);
        }
    }
}
