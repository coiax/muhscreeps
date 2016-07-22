var genericActions=require("genericactions"),roleHarvester=require("role.harvester"),roleUpgrader=require("role.upgrader"),roleBuilder=require("role.builder"),roleCow=require("role.cow"),roleGuard=require("role.guard"),roleTower=require("role.tower"),mother=require("mother"),util=require("util");
module.exports.loop=function(){mother.run();"undefined"==typeof Memory.structures&&(Memory.structures={});"undefined"==typeof Memory.cpu_use&&(Memory.cpu_use=[]);for(var c in Memory.structures)Game.structures[c]||delete Memory.structures[c];for(c in Game.structures){var e=Game.structures[c];if(e.isActive()){var a=e.getMemory(),f=e.structureType;a.type=f;(a=a.task_queue)&&util.run_task_queue(e,a);(!a||!a.length)&&f==STRUCTURE_TOWER&&roleTower.run(e)}}for(var d in Game.creeps){var b=Game.creeps[d];
if(!b.spawning&&(b.room.find(FIND_DROPPED_ENERGY).forEach(function(a){b.pickup(a)}),a=b.memory.task_queue,100>b.ticksToLive&&(b.memory.recharge&&(!a||a.length&&"renew"!=a[0].type))&&b.add_task({type:"renew"}),util.run_task_queue(b,a),!a||!a.length))c=b.memory.role,"harvester"==c&&roleHarvester.run(b),"upgrader"==c&&roleUpgrader.run(b),"builder"==c&&roleBuilder.run(b),"cow"==c&&roleCow.run(b),"guard"==c&&roleGuard.run(b)}Memory.cpu_use.push({time:Game.time,use:Game.cpu.getUsed()});d=0;for(var g in Memory.cpu_use)d+=
Memory.cpu_use[g].use;d/=Memory.cpu_use.length;Memory.avg_cpu=d;100<Memory.cpu_use.length&&Memory.cpu_use.splice(0,Memory.cpu_use.length-100)};
