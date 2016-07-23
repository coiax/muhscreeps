require("prototype.creep");require("prototype.structure");require("prototype.room");require("prototype.roomposition");require("structure.tower");require("structure.spawner");var gc=require("gc"),cpu_tracker=require("cpu_tracker"),task_manager=require("task_manager"),roles=require("roles"),mother=require("mother"),util=require("util");function cpu_debug(b){Memory.cpu_debug?console.log(Game.cpu.getUsed()+": "+b):Memory.cpu_debug=!1}
module.exports.loop=function(){cpu_debug("Start mainloop");if(!Memory.just_exit){gc.gc();mother.run();for(var b in Game.rooms)cpu_debug("Scouting "+b),Game.rooms[b].scout_room();for(var d in Game.structures)if(b=Game.structures[d],b.isActive()){var e=b.getMemory();cpu_debug("Running tasks for "+d+"("+stype+")");e.type=stype;var c=e.task_queue;if(!c||!c.length)switch(stype){case STRUCTURE_TOWER:b.add_task({type:"structure.tower"});break;case STRUCTURE_SPAWN:b.add_task({type:"structure.spawner"})}e.task_queue&&
e.task_queue.length&&task_manager.run_task_queue(b,c)}for(var f in Game.creeps){var a=Game.creeps[f];cpu_debug("Running tasks for "+f);a.spawning||(a.memory.role&&(a.add_task({type:roles[a.memory.role].name}),a.memory.role=void 0),a.room.find(FIND_DROPPED_ENERGY).forEach(function(b){a.pickup(b)}),a.carry.energy&&!a.memory.no_driveby_repair&&(d=a.pos.findInRange(FIND_STRUCTURES,3,{filter:util.is_damaged}),a.repair(_.sample(d))),c=a.memory.task_queue,100>a.ticksToLive&&(a.memory.recharge&&(!c||c.length&&
"renew"!=c[0].type))&&a.add_task({type:"renew"}),task_manager.run_task_queue(a,a.memory.task_queue))}cpu_debug("Recording total CPU usage.");cpu_tracker.record_main();cpu_tracker.calculate();cpu_debug("Main loop complete.");gc.gc()}};
