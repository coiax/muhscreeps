require("prototype.creep");require("prototype.structure");require("prototype.room");require("prototype.roomposition");require("structure.tower");require("structure.spawner");var gc=require("gc"),cpu_tracker=require("cpu_tracker"),task_manager=require("task_manager"),roles=require("roles"),util=require("util");function cpu_debug(a){Memory.cpu_debug?console.log(Game.cpu.getUsed()+": "+a):Memory.cpu_debug=!1}
module.exports.loop=function(){cpu_debug("Start mainloop");if(!Memory.just_exit){gc.gc();for(var a in Game.rooms)cpu_debug("Scouting "+a),Game.rooms[a].scout_room();for(var c in Game.structures)if(a=Game.structures[c],a.isActive()){var e=a.getMemory(),f=a.structureType;cpu_debug("Running tasks for "+c+"("+f+")");var d=e.task_queue;if(!d||!d.length)switch(f){case STRUCTURE_TOWER:a.add_task({type:"structure.tower"});break;case STRUCTURE_SPAWN:a.add_task({type:"structure.spawner"})}e.task_queue&&e.task_queue.length&&
task_manager.run_task_queue(a,d)}for(var g in Game.creeps){var b=Game.creeps[g];cpu_debug("Running tasks for "+g);b.spawning||(b.room.find(FIND_DROPPED_ENERGY).forEach(function(a){b.pickup(a)}),b.carry.energy&&!b.memory.no_driveby_repair&&(c=b.pos.findInRange(FIND_STRUCTURES,3,{filter:util.is_damaged}),c=_.sortBy(c,_.property("hits")),c.length&&b.repair(c[0])),d=b.memory.task_queue,100>b.ticksToLive&&(b.memory.recharge&&(!d||d.length&&"renew"!=d[0].type))&&b.add_task({type:"renew"}),task_manager.run_task_queue(b,
b.memory.task_queue))}cpu_debug("Recording total CPU usage.");cpu_tracker.record_main();cpu_tracker.calculate();cpu_debug("Main loop complete.");gc.gc()}};
