'use strict';var task_manager = require("task_manager"), outcomes = task_manager.outcomes;
function room_spawn(b, a) {
  console.log("Running task(room_spawn) for " + a);
  return new outcomes.NextTask
}
task_manager.register(room_spawn);

