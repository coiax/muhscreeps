Creep.prototype.add_task=function(c){this.memory.task_queue||(this.memory.task_queue=[]);this.memory.task_queue.unshift(c)};Creep.prototype.pop_task=function(){this.memory.task_queue.shift()};Creep.prototype.renewCost=function(){return floor(600/this.body.length)};Structure.prototype.getMemory=function(){var c=Memory.structures[this.id];if(c)return c;Memory.structures[this.id]={};return Memory.structures[this.id]};
Structure.prototype.add_task=function(c){var a=this.getMemory();a.task_queue||(a.task_queue=[]);a.task_queue.unshift(c)};Structure.prototype.pop_task=function(){this.getMemory().task_queue.shift()};
module.exports={harvest:function(c,a){if(a.carryCapacity==a.carry.energy)return{outcome:"didnothing"};var b=Game.getObjectById(c.selected_source_id);if(!b&&(b=a.pos.findClosestByRange(FIND_SOURCES)))c.selected_source_id=b.id;return!b?(a.say("!sr?:("),{outcome:"newtask",task:{type:"resupply"}}):a.harvest(b)==ERR_NOT_IN_RANGE?(a.moveTo(b),{outcome:"continue"}):a.carryCapacity==a.carry.energy?{outcome:"done"}:{outcome:"continue"}},construct:function(c,a){var b=c.resupply,d=Game.getObjectById(c.target_id);
if(!d)return a.say("cs ?!?"),{outcome:"didnothing"};if(0==a.carry.energy)return b?{outcome:"newtask",task:{type:b}}:{outcome:"didnothing"};if("undefined"==typeof d.progress){if(d.hits==d.hitsMax)return{outcome:"didnothing"};b=a.repair(d)}else b=a.build(d);b==ERR_NOT_IN_RANGE&&a.moveTo(d);return{outcome:"continue"}},resupply:function(c,a){var b=a.carryCapacity-a.carry.energy;if(0==b)return{outcome:"didnothing"};var d=Game.getObjectById(c.gas_station_id);if(!d){var e=a.room.find(FIND_STRUCTURES,{filter:function(a){return a.structureType!=
STRUCTURE_CONTAINER?!1:a.store[RESOURCE_ENERGY]>b}});e.length&&(d=a.pos.findClosestByRange(e),c.gas_station_id=d.id)}if(!d)return{outcome:"replace",task:{type:"harvest"}};e=a.withdraw(d,RESOURCE_ENERGY);return e==ERR_NOT_IN_RANGE?(a.moveTo(d),{outcome:"continue"}):e==ERR_NOT_ENOUGH_RESOURCES?(c.gas_station_id=null,{outcome:"continue"}):e!=OK?(a.say("rs!"+e),{outcome:"continue"}):{outcome:"done"}},renew:function(c,a){if(1400<=a.ticksToLive)return{outcome:"done"};var b=Game.getObjectById(c.spawn_id);
if(!b&&(b=a.pos.findClosestByRange(FIND_MY_SPAWNS)))c.spawn_id=b.id;if(!b)return a.say("SPN?!?"),{outcome:"done"};var d=b.renewCreep(a);a.transfer(b,RESOURCE_ENERGY);if(d==ERR_NOT_IN_RANGE)a.moveTo(b);else if(d==ERR_FULL||d==ERR_NOT_ENOUGH_ENERGY)return{outcome:"done"};return{outcome:"continue"}},transfer_energy:function(c,a){target=Game.getObjectById(c.target_id);if(!target||target.energy==target.energyCapacity||0==a.carry.energy)return{outcome:"didnothing"};switch(a.transfer(target,RESOURCE_ENERGY)){case ERR_NOT_IN_RANGE:a.moveTo(target);
break;case ERR_FULL:if(c.dump_excess_on_target)if(a.pos!=target.pos){a.moveTo(target);break}else return a.drop(RESOURCE_ENERGY),{outcome:"done"};case ERR_INVALID_TARGET:return{outcome:"didnothing"};case OK:return{outcome:"done"}}return{outcome:"continue"}},tower_target:function(c,a){target=Game.getObjectById(c.target_id);mode=c.mode;if(!mode||!target||c.times_run&&25<c.times_run)return{outcome:"didnothing"};var b;switch(mode){case "heal":if(target.hits==target.hitsMax)return{outcome:"didnothing"};
b=a.heal(target);break;case "repair":if(target.hits==target.hitsMax)return{outcome:"didnothing"};b=a.repair(target);break;case "attack":b=a.attack(target)}switch(b){case ERR_INVALID_TARGET:case ERR_RCL_NOT_ENOUGH:return{outcome:"didnothing"};case OK:case ERR_NOT_ENOUGH_RESOURCES:return{outcome:"continue"}}},dismantle:function(c,a){var b=Game.getObjectById(c.target_id);if(!b)return{outcome:"didnothing"};if(a.carry.energy==a.carryCapacity){var d=a.pos.findStructures(STRUCTURE_CONTAINER);if(d=a.pos.findClosestByPath(d))return c=
{type:"transfer_energy",target_id:d.id,dump_excess_on_target:!0},{outcome:"newtask",task:c};a.drop(RESOURCE_ENERGY)}switch(a.dismantle(b)){case ERR_NOT_IN_RANGE:return a.moveTo(b),{outcome:"continue"};case OK:return{outcome:"done"};default:return{outcome:"didnothing"}}}};
