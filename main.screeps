var genericActions = require('genericactions');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCow = require('role.cow');
var roleGuard = require('role.guard');
var mother = require('mother');

module.exports.loop = function () {
    mother.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.spawning) {
            continue;
        }
        if((creep.ticksToLive < 100) && (!creep.memory.no_recharge)) {
            creep.addTask({type:"renew"});
        }
        var tq = creep.memory.task_queue;
        if(tq && tq.length) {
            var task = tq[0];
            if(typeof task.times_run == 'undefined') {
                task.times_run = 0
            }
            var ttype = task.type;
            var func = genericActions[ttype];

            var result = func(task, creep);
            if(!result) {
                creep.say("!octq");
                creep.pop_task();
            } else if(result.outcome == "done") {
                creep.pop_task();
            } else if(result.outcome == "continue") {
                task.times_run++;
            } else if(result.outcome == "newtask") {
                task.times_run++;
                creep.add_task(result.task)
            } else if(result.outcome == "replace") {
                creep.pop_task();
                creep.add_task(result.task);
            } else {
                creep.say("?" + result.outcome);
                creep.pop_task();
            }
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
