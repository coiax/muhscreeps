var genericActions=require("genericactions"),roleHarvester=require("role.harvester"),roleUpgrader=require("role.upgrader"),roleBuilder=require("role.builder"),roleCow=require("role.cow"),mother=require("mother");
module.exports.loop=function(){mother.run();var a=Game.getObjectById("TOWER_ID");if(a){var b=a.pos.findClosestByRange(FIND_STRUCTURES,{filter:function(a){return a.hits<a.hitsMax}});b&&a.repair(b);(b=a.pos.findClosestByRange(FIND_HOSTILE_CREEPS))&&a.attack(b)}for(var d in Game.creeps){a=Game.creeps[d];if((b=a.memory.task_queue)&&b.length){var c=b[0];a.say("tq:"+c.type);"harvest"==c.type?(c=genericActions.harvest(a))&&a.pop_task():"construct"==c.type&&(c=genericActions.construct(a,c.target,c.resupply))&&
a.pop_task();if(!b||!b.length)continue}"harvester"==a.memory.role&&roleHarvester.run(a);"upgrader"==a.memory.role&&roleUpgrader.run(a);"builder"==a.memory.role&&roleBuilder.run(a);"cow"==a.memory.role&&roleCow.run(a)}};
