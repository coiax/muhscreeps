var genericActions=require("genericactions"),roleHarvester=require("role.harvester"),roleUpgrader=require("role.upgrader"),roleBuilder=require("role.builder"),roleCow=require("role.cow"),mother=require("mother");
module.exports.loop=function(){mother.run();for(var d in Game.creeps){var a=Game.creeps[d];if(!a.spawning){var b=a.memory.task_queue;if(b&&b.length){var c=b[0];(0,genericActions[c.type])(c,a)&&a.pop_task();if(b&&b.length)continue}"harvester"==a.memory.role&&roleHarvester.run(a);"upgrader"==a.memory.role&&roleUpgrader.run(a);"builder"==a.memory.role&&roleBuilder.run(a);"cow"==a.memory.role&&roleCow.run(a);"guard"==a.memory.role&&roleGuard.run(a)}}};
