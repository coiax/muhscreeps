require("loaded_modules");
var gc = require("gc"), cpu_tracker = require("cpu_tracker"), task_manager = require("task_manager"), util = require("util"), cpu_debug = util.cpu_debug;
module.exports.loop = function() {
  var a = Game.cpu.bucket;
  if(500 > a) {
    console.log("Bucket is at " + a + ". Halting execution.")
  }else {
    if(a = cpu_tracker.start("internal", "memory_decode"), Memory.config || (Memory.config = {}), cpu_tracker.stop(a), "undefined" == typeof Memory.config.use_pathfinder && (Memory.config.use_pathfinder = !1), "undefined" == typeof Memory.config.cpu_debug && (Memory.config.cpu_debug = !1), "undefined" == typeof Memory.config.just_exit && (Memory.config.just_exit = !1), PathFinder.use(Memory.config.use_pathfinder), !Memory.config.just_exit) {
      cpu_debug("Start mainloop");
      a = cpu_tracker.start("internal", "gc");
      gc.gc();
      cpu_tracker.stop(a);
      var a = cpu_tracker.start("global", "scouting"), d;
      for(d in Game.rooms) {
        cpu_debug("Scouting " + d), Game.rooms[d].scout_room()
      }
      cpu_tracker.stop(a);
      d = {STRUCTURE_EXTENSION:!0, STRUCTURE_STORAGE:!0, STRUCTURE_EXTRACTOR:!0};
      for(var c in Game.structures) {
        var a = Game.structures[c], f = a.structureType;
        if(!d[f] && a.isActive()) {
          var g = a.get_memory();
          cpu_debug("Running tasks for " + c + "(" + f + ")");
          if(!a.has_tasks()) {
            switch(f) {
              case STRUCTURE_TOWER:
                a.add_task({type:"structure.tower"});
                break;
              case STRUCTURE_SPAWN:
                a.add_task({type:"structure.spawner"})
            }
          }
          a.has_tasks() && task_manager.run_task_queue(a, g.task_queue)
        }
      }
      for(var e in Game.creeps) {
        var b = Game.creeps[e];
        cpu_debug("Running tasks for " + e);
        b.spawning || (b.room.find(FIND_DROPPED_ENERGY).forEach(function(a) {
          b.pickup(a)
        }), b.carry.energy && !b.memory.no_driveby_repair && (c = b.pos.findInRange(FIND_STRUCTURES, 3, {filter:function(a) {
          return util.is_damaged && a.is_type([STRUCTURE_ROAD, STRUCTURE_CONTAINER])
        }}), c = _.sortBy(c, _.property("hits")), c.length && b.repair(c[0])), b.wants_renew() && b.add_task({type:"renew"}), b.has_tasks() || b.add_task({type:"taskless"}), task_manager.run_task_queue(b, b.memory.task_queue))
      }
      cpu_debug("Recording total CPU usage.");
      cpu_tracker.record_main();
      e = cpu_tracker.start("internal", "gc");
      gc.gc();
      cpu_tracker.stop(e);
      cpu_debug("Main loop complete.");
      cpu_tracker.calculate()
    }
  }
};

