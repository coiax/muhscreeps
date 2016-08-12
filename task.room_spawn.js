'use strict';var task_manager = require("task_manager"), outcomes = task_manager.outcomes, room_spawn = function(b, a) {
  console.log("Running task(room_spawn) for " + a);
  return new outcomes.NextTask
};
task_manager.register(room_spawn);

