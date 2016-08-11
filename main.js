'use strict';require("loaded_modules");
var gc = require("gc"), cpu_tracker = require("cpu_tracker"), task_manager = require("task_manager"), util = require("util"), cpu_debug = util.cpu_debug;
module.exports.loop = function() {
  var c = Game.cpu.bucket;
  if(500 > c) {
    console.log("Bucket is at " + c + ". Halting execution.")
  }else {
    if(c = cpu_tracker.start("internal", "memory_decode"), Memory.config || (Memory.config = {}), cpu_tracker.stop(c), "undefined" === typeof Memory.config.use_pathfinder && (Memory.config.use_pathfinder = !1), "undefined" === typeof Memory.config.cpu_debug && (Memory.config.cpu_debug = !1), "undefined" === typeof Memory.config.just_exit && (Memory.config.just_exit = !1), PathFinder.use(Memory.config.use_pathfinder), !Memory.config.just_exit) {
      cpu_debug("Start mainloop");
      c = cpu_tracker.start("internal", "gc");
      gc.gc();
      cpu_tracker.stop(c);
      var c = cpu_tracker.start("global", "scouting"), a;
      for(a in Game.rooms) {
        cpu_debug("Scouting " + a), Game.rooms[a].scout_room()
      }
      cpu_tracker.stop(c);
      for(var b in Game.structures) {
        if(a = Game.structures[b], c = a.structureType, a.isActive()) {
          var e = a.get_memory();
          cpu_debug("Running tasks for " + b + "(" + c + ")");
          if(!a.has_tasks()) {
            switch(c) {
              case STRUCTURE_TOWER:
                a.add_task({type:"structure.tower"});
                break;
              case STRUCTURE_SPAWN:
                a.add_task({type:"structure.spawner"})
            }
          }
          a.has_tasks() && task_manager.run_task_queue(a, e.task_queue)
        }
      }
      for(var d in Game.creeps) {
        if(b = Game.creeps[d], cpu_debug("Running tasks for " + d), !b.spawning) {
          if(!b.has_flag("no_autopickup")) {
            a = b.room.find(FIND_DROPPED_ENERGY);
            for(c = 0;c < a.length;c++) {
              b.pickup(a[c])
            }
          }
          b.carry.energy && !b.has_flag("no_autorepair") && (a = b.pos.findInRange(FIND_STRUCTURES, 3, {filter:_.method("is_autorepairable")}), a = _.sortBy(a, _.property("hits")), a.length && b.repair(a[0]));
          b.wants_renew() && b.add_task({type:"renew"});
          !b.has_tasks() && !b.has_flag("no_autotask") && b.add_task({type:"taskless"});
          task_manager.run_task_queue(b, b.memory.task_queue)
        }
      }
      cpu_debug("Recording total CPU usage.");
      cpu_tracker.record_main();
      d = cpu_tracker.start("internal", "gc");
      gc.gc();
      cpu_tracker.stop(d);
      cpu_debug("Main loop complete.");
      cpu_tracker.calculate()
    }
  }
};

