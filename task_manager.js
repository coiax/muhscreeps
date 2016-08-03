var cpu_tracker=require("cpu_tracker"),util=require("util"),globals=require("task_manager.globals"),outcomes=globals.outcomes,task_functions={harvest:function(c,b){if(b.is_full())return outcomes.AlreadyComplete();var a=Game.getObjectById(c.selected_source_id);if(!a&&(a=b.pos.findClosestByRange(FIND_SOURCES,{filter:function(a){return a.is_harvestable(b)}})))c.selected_source_id=a.id;if(!a)return c.no_resupply?outcomes.Failure("No sources found."):outcomes.PushTask({type:"resupply"});var d=b.harvest(a);
switch(d){case ERR_NOT_OWNER:case ERR_BUSY:case ERR_NOT_FOUND:case ERR_INVALID_TARGET:case ERR_NO_BODYPART:return outcomes.TaskError(d);case ERR_NOT_IN_RANGE:if(a.is_harvestable(b))return b.moveTo(a),outcomes.InProgress();c.selected_source_id=null;return outcomes.Rerun();case OK:return outcomes.InProgress();case ERR_NOT_ENOUGH_RESOURCES:return c.selected_source_id=null,outcomes.Rerun()}},construct:function(c,b){var a=c.resupply,d=Game.getObjectById(c.target_id);if(!b.body_part_count(WORK,!0))return outcomes.Failure("No WORK parts.");
if(!b.body_part_count(CARRY,!0))return outcomes.Failure("No CARRY parts.");if(!d)return"build"==c.mode?outcomes.AlreadyComplete():outcomes.Failure("Target not found.");if(0==b.carry.energy)return a?outcomes.PushTask({type:a}):outcomes.Failure("No energy, resupply disabled.");if("undefined"==typeof d.progress){c.mode="repair";if(d.hits==d.hitsMax)return outcomes.AlreadyComplete();a=b.repair(d)}else c.mode="build",b.cancelOrder("repair"),a=b.build(d);switch(a){case ERR_NOT_OWNER:case ERR_BUSY:case ERR_NOT_ENOUGH_RESOURCES:case ERR_INVALID_TARGET:case ERR_NO_BODYPART:case ERR_RCL_NOT_ENOUGH:return outcomes.TaskError(a);
case ERR_NOT_IN_RANGE:b.moveTo(d);case OK:return outcomes.InProgress()}},resupply:function(c,b){_.sum(b.carry);if(b.is_full())return outcomes.AlreadyComplete();var a=Game.getObjectById(c.gas_station_id);if(!a){var d=[STRUCTURE_CONTAINER,STRUCTURE_STORAGE],e=b.room.find(FIND_STRUCTURES,{filter:function(a){return a.is_type(d)&&a.store[RESOURCE_ENERGY]}}),f=b.room.find(FIND_DROPPED_ENERGY),e=e.concat(f);if(e.length)if(a=b.pos.findClosestByRange(e),a.structureType)c.gas_station_id=a.id;else return c=
{type:"pickup",target_id:a.id},outcomes.PushTask(c)}if(!a)return c={type:"harvest",timeout:30,no_resupply:!0},outcomes.PushTask(c);e=b.withdraw(a,RESOURCE_ENERGY);return e==ERR_NOT_IN_RANGE?(b.moveTo(a),outcomes.InProgress()):e==ERR_NOT_ENOUGH_RESOURCES?(c.gas_station_id=null,outcomes.Rerun()):e!=OK?(b.say("rs!"+e),outcomes.InProgress()):outcomes.Complete()},renew:function(c,b){if(1400<=b.ticksToLive)return outcomes.AlreadyComplete();var a=Game.getObjectById(c.spawn_id);if(!a){var a=[],d;for(d in Game.spawns)a.push(Game.spawns[d]);
if(a=b.pos.findClosestByRange(a))c.spawn_id=a.id}if(!a)return outcome.Failure("No nearby spawn found.");d=a.renewCreep(b);b.transfer(a,RESOURCE_ENERGY);switch(d){case ERR_INVALID_TARGET:case ERR_NOT_OWNER:return outcome.TaskError(d);case OK:case ERR_BUSY:return outcome.InProgress();case ERR_NOT_ENOUGH_ENERGY:return outcome.Failure("Spawn has not enough energy.");case ERR_FULL:return outcome.AlreadyComplete();case ERR_NOT_IN_RANGE:return b.moveTo(a),outcome.InProgress()}},transfer_to:function(c,b){var a=
Game.getObjectById(c.target_id),d=util.memoryPosition(c.destination_pos),e=c.resource_type||RESOURCE_ENERGY,f=c.amount;if(!a&&!d)return outcomes.TaskError("No target or destination.");if(!b.carry[e])return outcomes.TaskError("Creep not carrying "+e);"undefined"!=typeof f&&(f=max(b.carry[e],f),c.amount=f);if(!a)if(d.roomName==b.room.name){var d=d.look(LOOK_STRUCTURES),g;for(g in d){var h=d[g],k=b.transfer(h,e,f);if(k!=ERR_INVALID_TARGET){a=h;c.target_id=a.id;break}}if(!a)return outcomes.TaskError("No target found at destination.")}else return b.moveTo(d),
outcomes.InProgress();c.destination_pos=a.pos;k=b.transfer(a,e,f);switch(k){case ERR_NOT_OWNER:case ERR_BUSY:case ERR_NOT_ENOUGH_RESOURCES:case ERR_INVALID_ARGS:case ERR_INVALID_TARGET:return outcomes.TaskError(k);case ERR_FULL:return outcomes.AlreadyComplete();case ERR_NOT_IN_RANGE:return b.moveTo(a),outcomes.InProgress();case OK:return outcomes.Complete()}},tower_target:function(c,b){target=Game.getObjectById(c.target_id);mode=c.mode;if(!target)return outcomes.Failure("No target.");if(!mode)return outcomes.TaskError("No mode.");
if(b.energy<TOWER_ENERGY_COST)return outcomes.InProgress();var a;switch(mode){case "heal":if(target.hits==target.hitsMax)return outcomes.AlreadyComplete();a=b.heal(target);break;case "repair":if(target.hits==target.hitsMax)return outcomes.AlreadyComplete();a=b.repair(target);break;case "attack":a=b.attack(target);break;default:return outcomes.TaskError("Bad mode "+mode)}switch(a){case ERR_INVALID_TARGET:case ERR_RCL_NOT_ENOUGH:case ERR_NOT_ENOUGH_RESOURCES:return outcomes.TaskError(a);case OK:return outcomes.InProgress()}},
dismantle:function(c,b){var a=Game.getObjectById(c.target_id);if(!a)return outcomes.Failure("No target found.");if(b.is_full())return c={type:"deposit"},outcomes.PushTask(c);var d=b.dismantle(a);switch(d){case ERR_NOT_IN_RANGE:return b.moveTo(a),outcomes.InProgress();case OK:return outcomes.Complete();default:return outcomes.TaskError(d)}},leave_location:function(c,b){var a=util.memoryPosition(c.pos);return b.pos.isEqualTo(a)?(b.say("Aaaaaa!"),b.move(Math.floor(8*Math.random()+1)),outcomes.InProgress()):
outcomes.AlreadyComplete()},move_to:function(c,b){var a=Game.getObjectById(c.target_id),a=a?a.pos:util.memoryPosition(c.destination_pos);return!a?outcomes.TaskError("No destination found."):b.pos.isEqualTo(a)?outcomes.AlreadyComplete():b.moveTo(a)==ERR_NO_PATH?outcomes.Failure("No path found."):outcomes.InProgress()},suicide:function(c,b){b.suicide();return outcomes.Complete()},recycle:function(c,b){var a=Game.getObjectById(c.spawn_id);if(!a){var a=[],d;for(d in Game.spawns)a.push(Game.spawns[d]);
if(a=b.pos.findClosestByPath(a))c.spawn_id=a.id}return!a?(b.suicide(),outcomes.Complete()):a.recycleCreep(b)==ERR_NOT_IN_RANGE?(b.moveTo(a),outcomes.InProgress()):outcomes.Complete()},pickup:function(c,b){if(b.is_full())return outcomes.AlreadyComplete();var a=Game.getObjectById(c.target_id);if(!a)return outcomes.Failure("No target found.");var d=b.pickup(a);return d==ERR_NOT_IN_RANGE?(b.moveTo(a),outcomes.InProgress()):d==ERR_INVALID_TARGET?outcomes.Failure(d):outcomes.Complete()},travel_to_room:function(c,
b){var a=c.destination_room,d=b.room.roomName;if(!a)return outcomes.TaskError("No room given.");if(d==a)return outcomes.AlreadyComplete();if(!c.route){rc=Game.map.findRoute(d,a);if(rc==ERR_NO_PATH)return outcomes.Failure("No path to destination.");c.route=rc;c.route_index=0}b.say("TODO");return{outcome:"continue"}},move_to_exit:function(c,b){var a=util.memoryPosition(c.destination_pos),d=c.destination_room,e=b.room.name;if(d==e||b.pos==a)return outcomes.AlreadyComplete();if(!a||!d||a.roomName!=e)return outcomes.TaskError("Invalid destination/room");
b.moveTo(a);return outcomes.InProgress()},taskless:function(c,b){var a=b.body_part_count(WORK),d=b.body_part_count(CARRY),a=!a&&!d?"role.dumbscout":a&&!d?"role.cow":!a&&d?"role.supplier":_.sample(["role.supplier","role.cow","role.upgrader","role.builder"]);return outcomes.ReplaceTask({type:a})},deposit:function(c,b){if(b.is_empty())return outcomes.AlreadyComplete();var a=Game.spawns[b.memory.support];if(a){var d=a.room.storage;if(d&&!1==d.is_full())return c={type:"transfer_to",target_id:d.id},outcomes.PushTask(c);
if(a.room.name!=b.room.name)return c={type:"travel_to_room",destination_room:a.room.name},outcomes.PushTask(c)}return outcomes.TaskError("Could not find spawn.")}};
module.exports={globals:require("task_manager.globals"),task_functions:task_functions,register:function(c,b){task_functions[c]=b},run_task_queue:function(c,b){for(;b&&b.length;){var a=b[0];"undefined"==typeof a.times_run&&(a.times_run=0);var d=a.type,e,f=cpu_tracker.start("tasks",d),g=task_functions[d];if(g)try{e=g(a,c)}catch(h){e=outcomes.TaskError("Exception: "+h)}else e=outcomes.TaskError("No handler for task type.");cpu_tracker.stop(f);e.outcome&&(e=outcomes.TaskError("Outcome is old format."));
e||(e=outcomes.TaskError("No outcome returned."));a.times_run>=a.timeout&&(e.pop=!0);e.pop&&c.pop_task();e.increment&&(a.times_run+=e.increment);e.push&&c.add_task(e.push);e.warning&&c.warning("task",e.warning);e.error&&(a="Task("+d+"): "+e.error,console.log(a),c.error("task",a));if(e.stop)break}}};
