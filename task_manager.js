var cpu_tracker=require("cpu_tracker"),util=require("util"),task_functions={harvest:function(c,b){if(b.carryCapacity==b.carry.energy)return{outcome:"didnothing"};var a=Game.getObjectById(c.selected_source_id);if(!a&&(a=b.pos.findClosestByRange(FIND_SOURCES,{filter:function(a){return a.is_harvestable(b)}})))c.selected_source_id=a.id;if(!a)return b.say("!sr?:("),c.no_resupply?{outcome:"didnothing"}:{outcome:"newtask",task:{type:"resupply"}};if(0==a.energy)return c.selected_source_id=null,{outcome:"rerun"};
if(b.harvest(a)==ERR_NOT_IN_RANGE){if(a.is_harvestable(b))return b.moveTo(a),{outcome:"continue"};c.selected_source_id=null;return{outcome:"rerun"}}return b.carryCapacity==b.carry.energy?{outcome:"done"}:{outcome:"continue"}},construct:function(c,b){var a=c.resupply,d=Game.getObjectById(c.target_id);if(!d)return b.say("cs ?!?"),{outcome:"didnothing"};if(0==b.carry.energy)return a?{outcome:"newtask",task:{type:a}}:{outcome:"didnothing"};if("undefined"==typeof d.progress){if(d.hits==d.hitsMax)return{outcome:"didnothing"};
a=b.repair(d)}else b.cancelOrder("repair"),a=b.build(d);a==ERR_NOT_IN_RANGE&&b.moveTo(d);return{outcome:"continue"}},resupply:function(c,b){_.sum(b.carry);if(b.is_full())return{outcome:"didnothing"};var a=Game.getObjectById(c.gas_station_id);if(!a){var d=[STRUCTURE_CONTAINER,STRUCTURE_STORAGE],e=b.room.find(FIND_STRUCTURES,{filter:function(a){return a.is_type(d)&&a.store[RESOURCE_ENERGY]}}),g=b.room.find(FIND_DROPPED_ENERGY),e=e.concat(g);if(e.length)if(a=b.pos.findClosestByRange(e),a.structureType)c.gas_station_id=
a.id;else return c={type:"pickup",target_id:a.id},{outcome:"newtask",task:c}}if(!a)return c={type:"harvest",timeout:30,no_resupply:!0},{outcome:"newtask",task:c};e=b.withdraw(a,RESOURCE_ENERGY);return e==ERR_NOT_IN_RANGE?(b.moveTo(a),{outcome:"continue"}):e==ERR_NOT_ENOUGH_RESOURCES?(c.gas_station_id=null,{outcome:"continue"}):e!=OK?(b.say("rs!"+e),{outcome:"continue"}):{outcome:"done"}},renew:function(c,b){if(1400<=b.ticksToLive)return{outcome:"done"};var a=Game.getObjectById(c.spawn_id);if(!a){var a=
[],d;for(d in Game.spawns)a.push(Game.spawns[d]);if(a=b.pos.findClosestByRange(a))c.spawn_id=a.id}if(!a)return b.say("SPN?!?"),{outcome:"done"};d=a.renewCreep(b);b.transfer(a,RESOURCE_ENERGY);if(d==ERR_NOT_IN_RANGE)b.moveTo(a);else if(d==ERR_FULL||d==ERR_NOT_ENOUGH_ENERGY)return{outcome:"done"};return{outcome:"continue"}},transfer_energy:function(c,b){target=Game.getObjectById(c.target_id);if(!target||target.energy==target.energyCapacity||0==b.carry.energy)return{outcome:"didnothing"};switch(b.transfer(target,
RESOURCE_ENERGY)){case ERR_NOT_IN_RANGE:b.moveTo(target);break;case ERR_FULL:if(c.dump_excess_on_target)if(b.pos!=target.pos){b.moveTo(target);break}else return b.drop(RESOURCE_ENERGY),{outcome:"done"};case ERR_INVALID_TARGET:return{outcome:"didnothing"};case OK:return{outcome:"done"}}return{outcome:"continue"}},tower_target:function(c,b){target=Game.getObjectById(c.target_id);mode=c.mode;if(!mode||!target||b.energy<TOWER_ENERGY_COST)return{outcome:"didnothing"};var a;switch(mode){case "heal":if(target.hits==
target.hitsMax)return{outcome:"didnothing"};a=b.heal(target);break;case "repair":if(target.hits==target.hitsMax)return{outcome:"didnothing"};a=b.repair(target);break;case "attack":a=b.attack(target)}switch(a){case ERR_INVALID_TARGET:case ERR_RCL_NOT_ENOUGH:return{outcome:"didnothing"};case OK:case ERR_NOT_ENOUGH_RESOURCES:return{outcome:"continue"}}},dismantle:function(c,b){var a=Game.getObjectById(c.target_id);if(!a)return{outcome:"didnothing"};if(b.carry.energy==b.carryCapacity){var d=b.pos.findStructures(STRUCTURE_CONTAINER);
if(d=b.pos.findClosestByPath(d))return c={type:"transfer_energy",target_id:d.id,dump_excess_on_target:!0},{outcome:"newtask",task:c};b.drop(RESOURCE_ENERGY)}switch(b.dismantle(a)){case ERR_NOT_IN_RANGE:return b.moveTo(a),{outcome:"continue"};case OK:return{outcome:"done"};default:return{outcome:"didnothing"}}},leave_location:function(c,b){var a=util.memoryPosition(c.pos);return b.pos.isEqualTo(a)?(b.say("Aaaaaa!"),b.move(Math.floor(8*Math.random()+1)),{outcome:"done"}):{outcome:"didnothing"}},move_to:function(c,
b){var a=Game.getObjectById(c.target_id),a=a?a.pos:util.memoryPosition(c.destination_pos);return!a||b.pos.isEqualTo(a)?{outcome:"didnothing"}:b.moveTo(a)==ERR_NO_PATH?{outcome:"didnothing"}:{outcome:"continue"}},suicide:function(c,b){b.suicide();return{outcome:"done"}},recycle:function(c,b){var a=Game.getObjectById(c.spawn_id);if(!a){var a=[],d;for(d in Game.spawns)a.push(Game.spawns[d]);if(a=b.pos.findClosestByPath(a))c.spawn_id=a.id}return!a?(b.suicide(),{outcome:"done"}):a.recycleCreep(b)==ERR_NOT_IN_RANGE?
(b.moveTo(a),{outcome:"continue"}):{outcome:"done"}},pickup:function(c,b){if(b.is_full())return{outcome:"didnothing"};var a=Game.getObjectById(c.target_id);if(!a)return{outcome:"didnothing"};var d=b.pickup(a);return d==ERR_NOT_IN_RANGE?(b.moveTo(a),{outcome:"continue"}):d==ERR_INVALID_TARGET?{outcome:"didnothing"}:{outcome:"done"}},travel_to_room:function(c,b){var a=c.destination_room,d=b.room.roomName;if(!a||d==a)return{outcome:"didnothing"};if(!c.route){rc=Game.map.findRoute(d,a);if(rc==ERR_NO_PATH)return b.say("ttr!pa"),
{outcome:"continue"};c.route=rc;c.route_index=0}},taskless:function(c,b){var a=b.body_part_count(WORK),d=b.body_part_count(CARRY);return{outcome:"replace",task:{type:!a&&!d?"role.dumbscout":a&&!d?"role.cow":!a&&d?"role.supplier":_.sample(["role.supplier","role.cow","role.upgrader","role.builder"])}}}};
module.exports={task_functions:task_functions,register:function(c,b){task_functions[c]=b},run_task_queue:function(c,b){for(;b&&b.length;){var a=b[0];"undefined"==typeof a.times_run&&(a.times_run=0);var d=a.type,e=task_functions[d];if(!e){console.log("Task not found: "+d);break}var g=cpu_tracker.start("tasks",d);try{var f=e(a,c)}catch(h){console.log("Task "+d+" error:"+h);c.pop_task();continue}cpu_tracker.stop(g);if(f)if("done"==f.outcome)c.pop_task();else if("continue"==f.outcome)a.times_run++;else if("rerun"==
f.outcome){a.times_run++;continue}else if("newtask"==f.outcome)a.times_run++,c.add_task(f.task);else if("replace"==f.outcome)c.pop_task(),c.add_task(f.task);else if("didnothing"==f.outcome){c.pop_task();continue}else console.log("Task ("+d+") returned unrecognised outcome: "+f.outcome),c.pop_task();else console.log("Task did not return result: "+d),c.pop_task();a==b[0]&&(a.timeout&&a.times_run>=a.timeout)&&c.pop_task();break}}};
