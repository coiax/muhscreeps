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
      var a = cpu_tracker.start("global", "scouting"), c;
      for(c in Game.rooms) {
        cpu_debug("Scouting " + c), Game.rooms[c].scout_room()
      }
      cpu_tracker.stop(a);
      for(var d in Game.structures) {
        c = Game.structures[d];
        var a = c.structureType, e = !1;
        switch(a) {
          case STRUCTURE_EXTENSION:
          ;
          case STRUCTURE_STORAGE:
          ;
          case STRUCTURE_EXTRACTOR:
            e = !0
        }
        if(!e && c.isActive()) {
          e = c.get_memory();
          cpu_debug("Running tasks for " + d + "(" + a + ")");
          if(!c.has_tasks()) {
            switch(a) {
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
        var b = Game.creeps[f];
        cpu_debug("Running tasks for " + f);
        b.spawning || (b.has_flag("no_autopickup") || b.room.find(FIND_DROPPED_ENERGY).forEach(function(a) {
          b.pickup(a)
        }), b.carry.energy && !b.has_flag("no_autorepair") && (d = b.pos.findInRange(FIND_STRUCTURES, 3, {filter:function(a) {
          return util.is_damaged && a.is_type([STRUCTURE_ROAD, STRUCTURE_CONTAINER])
        }}), d = _.sortBy(d, _.property("hits")), d.length && b.repair(d[0])), b.wants_renew() && b.add_task({type:"renew"}), b.has_tasks() || b.add_task({type:"taskless"}), task_manager.run_task_queue(b, b.memory.task_queue))
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

