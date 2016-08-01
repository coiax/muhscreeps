require("loaded_modules");var gc=require("gc"),cpu_tracker=require("cpu_tracker"),task_manager=require("task_manager"),util=require("util");function cpu_debug(a){Memory.cpu_debug&&console.log(Game.cpu.getUsed()+": "+a)}
module.exports.loop=function(){var a=cpu_tracker.start("internal","memory_decode");Memory;cpu_tracker.stop(a);if(!Memory.just_exit){cpu_debug("Start mainloop");a=cpu_tracker.start("internal","gc");gc.gc();cpu_tracker.stop(a);var a=cpu_tracker.start("global","scouting"),c;for(c in Game.rooms)cpu_debug("Scouting "+c),Game.rooms[c].scout_room();cpu_tracker.stop(a);for(var d in Game.structures)if(c=Game.structures[d],c.isActive()){var a=c.getMemory(),f=c.structureType;cpu_debug("Running tasks for "+d+
"("+f+")");var e=a.task_queue;if(!e||!e.length)switch(f){case STRUCTURE_TOWER:c.add_task({type:"structure.tower"});break;case STRUCTURE_SPAWN:c.add_task({type:"structure.spawner"})}a.task_queue&&a.task_queue.length&&task_manager.run_task_queue(c,e)}for(var g in Game.creeps){var b=Game.creeps[g];cpu_debug("Running tasks for "+g);b.spawning||(b.room.find(FIND_DROPPED_ENERGY).forEach(function(a){b.pickup(a)}),b.carry.energy&&!b.memory.no_driveby_repair&&(d=b.pos.findInRange(FIND_STRUCTURES,3,{filter:function(a){return util.is_damaged&&
a==STRUCTURE_ROAD&&a==STRUCTURE_CONTAINER}}),d=_.sortBy(d,_.property("hits")),d.length&&b.repair(d[0])),b.wants_renew()&&b.add_task({type:"renew"}),b.has_tasks||b.add_task({type:"taskless"}),task_manager.run_task_queue(b,b.memory.task_queue))}cpu_debug("Recording total CPU usage.");cpu_tracker.record_main();cpu_debug("Main loop complete.");cpu_tracker.calculate()}};
