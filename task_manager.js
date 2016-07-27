var cpu_tracker=require("cpu_tracker"),util=require("util");
task_functions={harvest:function(c,a){if(a.carryCapacity==a.carry.energy)return{outcome:"didnothing"};var b=Game.getObjectById(c.selected_source_id);if(!b&&(b=a.pos.findClosestByRange(FIND_SOURCES,{filter:function(b){return b.is_harvestable(a)}})))c.selected_source_id=b.id;if(!b)return a.say("!sr?:("),{outcome:"newtask",task:{type:"resupply"}};if(0==b.energy)return c.selected_source_id=null,{outcome:"rerun"};if(a.harvest(b)==ERR_NOT_IN_RANGE){if(b.is_harvestable(a))return a.moveTo(b),{outcome:"continue"};
c.selected_source_id=null;return{outcome:"rerun"}}return a.carryCapacity==a.carry.energy?{outcome:"done"}:{outcome:"continue"}},construct:function(c,a){var b=c.resupply,d=Game.getObjectById(c.target_id);if(!d)return a.say("cs ?!?"),{outcome:"didnothing"};if(0==a.carry.energy)return b?{outcome:"newtask",task:{type:b}}:{outcome:"didnothing"};if("undefined"==typeof d.progress){if(d.hits==d.hitsMax)return{outcome:"didnothing"};b=a.repair(d)}else a.cancelOrder("repair"),b=a.build(d);b==ERR_NOT_IN_RANGE&&
a.moveTo(d);return{outcome:"continue"}},resupply:function(c,a){var b=a.carryCapacity-a.carry.energy;if(0==b)return{outcome:"didnothing"};var d=Game.getObjectById(c.gas_station_id);if(!d){var e=a.room.find(FIND_STRUCTURES,{filter:function(a){switch(a.structureType){case STRUCTURE_CONTAINER:case STRUCTURE_STORAGE:break;default:return!1}return a.store[RESOURCE_ENERGY]>b}});e.length&&(d=a.pos.findClosestByRange(e),c.gas_station_id=d.id)}if(!d)return{outcome:"replace",task:{type:"harvest"}};e=a.withdraw(d,
RESOURCE_ENERGY);return e==ERR_NOT_IN_RANGE?(a.moveTo(d),{outcome:"continue"}):e==ERR_NOT_ENOUGH_RESOURCES?(c.gas_station_id=null,{outcome:"continue"}):e!=OK?(a.say("rs!"+e),{outcome:"continue"}):{outcome:"done"}},renew:function(c,a){if(1400<=a.ticksToLive)return{outcome:"done"};var b=Game.getObjectById(c.spawn_id);if(!b&&(b=a.pos.findClosestByRange(FIND_MY_SPAWNS)))c.spawn_id=b.id;if(!b)return a.say("SPN?!?"),{outcome:"done"};var d=b.renewCreep(a);a.transfer(b,RESOURCE_ENERGY);if(d==ERR_NOT_IN_RANGE)a.moveTo(b);
else if(d==ERR_FULL||d==ERR_NOT_ENOUGH_ENERGY)return{outcome:"done"};return{outcome:"continue"}},transfer_energy:function(c,a){target=Game.getObjectById(c.target_id);if(!target||target.energy==target.energyCapacity||0==a.carry.energy)return{outcome:"didnothing"};switch(a.transfer(target,RESOURCE_ENERGY)){case ERR_NOT_IN_RANGE:a.moveTo(target);break;case ERR_FULL:if(c.dump_excess_on_target)if(a.pos!=target.pos){a.moveTo(target);break}else return a.drop(RESOURCE_ENERGY),{outcome:"done"};case ERR_INVALID_TARGET:return{outcome:"didnothing"};
case OK:return{outcome:"done"}}return{outcome:"continue"}},tower_target:function(c,a){target=Game.getObjectById(c.target_id);mode=c.mode;if(!mode||!target||c.times_run&&25<c.times_run)return{outcome:"didnothing"};var b;switch(mode){case "heal":if(target.hits==target.hitsMax)return{outcome:"didnothing"};b=a.heal(target);break;case "repair":if(target.hits==target.hitsMax)return{outcome:"didnothing"};b=a.repair(target);break;case "attack":b=a.attack(target)}switch(b){case ERR_INVALID_TARGET:case ERR_RCL_NOT_ENOUGH:return{outcome:"didnothing"};
case OK:case ERR_NOT_ENOUGH_RESOURCES:return{outcome:"continue"}}},dismantle:function(c,a){var b=Game.getObjectById(c.target_id);if(!b)return{outcome:"didnothing"};if(a.carry.energy==a.carryCapacity){var d=a.pos.findStructures(STRUCTURE_CONTAINER);if(d=a.pos.findClosestByPath(d))return c={type:"transfer_energy",target_id:d.id,dump_excess_on_target:!0},{outcome:"newtask",task:c};a.drop(RESOURCE_ENERGY)}switch(a.dismantle(b)){case ERR_NOT_IN_RANGE:return a.moveTo(b),{outcome:"continue"};case OK:return{outcome:"done"};
default:return{outcome:"didnothing"}}},leave_location:function(c,a){var b=util.memoryPosition(c.pos);return a.pos.isEqualTo(b)?(a.say("Aaaaaa!"),a.move(Math.floor(8*Math.random()+1)),{outcome:"done"}):{outcome:"didnothing"}},move_to:function(c,a){var b=util.memoryPosition(c.destination_pos);return a.pos.isEqualTo(b)?{outcome:"didnothing"}:a.moveTo(b)==ERR_NO_PATH?{outcome:"didnothing"}:{outcome:"continue"}},suicide:function(c,a){a.suicide();return{outcome:"continue"}}};
module.exports={task_functions:task_functions,register:function(c,a){task_functions[c]=a},run_task_queue:function(c,a){for(;a&&a.length;){var b=a[0];"undefined"==typeof b.times_run&&(b.times_run=0);var d=b.type,e=task_functions[d];if(!e){console.log("Task not found: "+d);break}var f=Game.cpu.getUsed(),e=e(b,c),g=Game.cpu.getUsed();cpu_tracker.record_task(d,g-f);if(e)if("done"==e.outcome)c.pop_task();else if("continue"==e.outcome)b.times_run++;else if("rerun"==e.outcome){b.times_run++;continue}else if("newtask"==
e.outcome)b.times_run++,c.add_task(e.task);else if("replace"==e.outcome)c.pop_task(),c.add_task(e.task);else if("didnothing"==e.outcome){c.pop_task();continue}else console.log("Task ("+d+") returned unrecognised outcome: "+e.outcome),c.pop_task();else console.log("Task did not return result: "+d),c.pop_task();break}}};
