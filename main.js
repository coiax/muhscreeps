'use strict';require("loaded_modules");
var gc = require("gc"), cpu_tracker = require("cpu_tracker"), task_manager = require("task_manager"), util = require("util"), cpu_debug = util.cpu_debug;
module.exports.loop = function() {
  var b = Game.cpu.bucket;
  if(500 > b) {
    console.log("Bucket is at " + b + ". Halting execution.")
  }else {
    if(b = cpu_tracker.start("internal", "memory_decode"), Memory.config || (Memory.config = {}), cpu_tracker.stop(b), "undefined" == typeof Memory.config.use_pathfinder && (Memory.config.use_pathfinder = !1), "undefined" == typeof Memory.config.cpu_debug && (Memory.config.cpu_debug = !1), "undefined" == typeof Memory.config.just_exit && (Memory.config.just_exit = !1), PathFinder.use(Memory.config.use_pathfinder), !Memory.config.just_exit) {
      cpu_debug("Start mainloop");
      b = cpu_tracker.start("internal", "gc");
      gc.gc();
      cpu_tracker.stop(b);
      var b = cpu_tracker.start("global", "scouting"), c;
      for(c in Game.rooms) {
        cpu_debug("Scouting " + c), Game.rooms[c].scout_room()
      }
      cpu_tracker.stop(b);
      for(var d in Game.structures) {
        c = Game.structures[d];
        var b = c.structureType, e = !1;
        switch(b) {
          case STRUCTURE_EXTENSION:
          ;
          case STRUCTURE_STORAGE:
          ;
          case STRUCTURE_EXTRACTOR:
            e = !0
        }
        if(!e && c.isActive()) {
          e = c.get_memory();
          cpu_debug("Running tasks for " + d + "(" + b + ")");
          if(!c.has_tasks()) {
            switch(b) {
              case STRUCTURE_TOWER:
                c.add_task({type:"structure.tower"});
                break;
              case STRUCTURE_SPAWN:
                c.add_task({type:"structure.spawner"})
            }
          }
          c.has_tasks() && task_manager.run_task_queue(c, e.task_queue)
        }
      }
      for(var f in Game.creeps) {
        var a = Game.creeps[f];
        cpu_debug("Running tasks for " + f);
        a.spawning || (a.has_flag("no_autopickup") || a.room.find(FIND_DROPPED_ENERGY).forEach(function(b) {
          a.pickup(b)
        }), a.carry.energy && !a.has_flag("no_autorepair") && (d = a.pos.findInRange(FIND_STRUCTURES, 3, {filter:function(a) {
          return util.is_damaged && a.is_type([STRUCTURE_ROAD, STRUCTURE_CONTAINER])
        }}), d = _.sortBy(d, _.property("hits")), d.length && a.repair(d[0])), a.wants_renew() && a.add_task({type:"renew"}), !a.has_tasks() && !a.has_flag("no_autotask") && a.add_task({type:"taskless"}), task_manager.run_task_queue(a, a.memory.task_queue))
      }
      cpu_debug("Recording total CPU usage.");
      cpu_tracker.record_main();
      f = cpu_tracker.start("internal", "gc");
      gc.gc();
      cpu_tracker.stop(f);
      cpu_debug("Main loop complete.");
      cpu_tracker.calculate()
    }
  }
};

