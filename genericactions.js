Creep.prototype.add_task=function(d){this.memory.task_queue||(this.memory.task_queue=[]);this.memory.task_queue.unshift(d)};Creep.prototype.pop_task=function(){this.memory.task_queue=_.drop(this.memory.task_queue);0==this.memory.task_queue.length&&(this.memory.task_queue=void 0)};Creep.prototype.renewCost=function(){return floor(600/this.body.length)};
module.exports={harvest:function(d,a){if(a.carryCapacity==a.carry.energy)return{outcome:"done"};var b=Game.getObjectById(d.selected_source_id);b||(b=a.pos.findClosestByPath(FIND_SOURCES),d.selected_source_id=b.id);return a.harvest(b)==ERR_NOT_IN_RANGE?(a.moveTo(b),{outcome:"continue"}):a.carryCapacity==a.carry.energy?{outcome:"done"}:{outcome:"continue"}},construct:function(d,a){var b=d.resupply,c=Game.getObjectById(d.target_id);if(!c)return a.say("cs ?!?"),{outcome:"done"};if(0==a.carry.energy)return b?
{outcome:"newtask",task:{type:b}}:{outcome:"done"};if("undefined"==typeof c.progress){if(c.hits==c.hitsMax)return{outcome:"done"};b=a.repair(c)}else b=a.build(c);b==ERR_NOT_IN_RANGE&&a.moveTo(c);return{outcome:"continue"}},resupply:function(d,a){var b=a.carryCapacity-a.carry.energy;if(0==b)return{outcome:"done"};var c=Game.getObjectById(d.gas_station_id);c||(c=a.room.find(FIND_STRUCTURES,{filter:function(a){return a.structureType!=STRUCTURE_CONTAINER?!1:a.store[RESOURCE_ENERGY]<b}}),c=a.pos.findClosestByPath(c),
d.gas_station_id=c.id);if(!c)return{outcome:"replace",task:{type:"harvest"}};var e=a.withdraw(c,RESOURCE_ENERGY);return e==ERR_NOT_IN_RANGE?(a.moveTo(c),{outcome:"continue"}):e!=OK?(a.say("rs"+e),{outcome:"continue"}):{outcome:"done"}},renew:function(d,a){if(1400<=a.ticksToLive)return{outcome:"done"};var b=Game.getObjectById(d.spawn_id);if(!b&&(b=a.pos.findClosestByPath(FIND_MY_SPAWNS)))d.spawn_id=b.id;if(!b)return a.say("SPN?!?"),{outcome:"done"};var c=b.renewCreep(a);a.transfer(b,RESOURCE_ENERGY);
if(c==ERR_NOT_IN_RANGE)a.moveTo(b);else if(c==ERR_FULL||c==ERR_NOT_ENOUGH_ENERGY)return{outcome:"done"};return{outcome:"continue"}}};
