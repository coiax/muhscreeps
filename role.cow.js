var util=require("util"),task_manager=require("task_manager");function memoryPosition(e){return e?new RoomPosition(e.x,e.y,e.roomName):null}
var roleCow={name:"role.cow",parts:[[WORK,CARRY,MOVE],[WORK,WORK,CARRY,MOVE],[WORK,WORK,WORK,CARRY,MOVE,MOVE]],run:function(e,a){var b=Game.getObjectById(a.memory.source_id);if(!b){a.say("l4s");var b=a.room.find(FIND_SOURCES),f={};b.forEach(function(a){f[a]=0});for(var c in Game.creeps){var d=Game.creeps[c];if(a.name!=d.name&&"cow"==d.memory.role){var g=Game.getObjectById(d.memory.source_id);f[g]++}}b=_.sortBy(b,function(a){return f[a]});if(b=b[0])a.memory.source_id=b.id}if(!b)return a.say("!?src"),
{outcome:"continue"};d=memoryPosition(a.memory.pasture_loc);if(!d){var h=b.pos.non_wall_adjacent();for(c in Game.creeps)if(c!=a.name&&(d=Game.creeps[c],"cow"==d.memory.role&&(g=Game.getObjectById(d.memory.source_id),g==b))){var k=memoryPosition(d.memory.pasture_loc);_.remove(h,function(a){return k.isEqualTo(a)})}d=_.sample(h);a.memory.pasture_loc=d}if(d.is_wall()||1!=d.getRangeTo(b))return a.say("!ploc"),a.memory.debug_bad_pasture_loc=d,a.memory.pasture_loc=null,{outcome:"continue"};if(!d.isEqualTo(a.pos))return a.moveTo(d),
{outcome:"continue"};c=Game.getObjectById(a.memory.output_container_id);c||(d=a.pos.findInRange(FIND_STRUCTURES,1,{filter:function(a){return a.structureType==STRUCTURE_CONTAINER}}),d.length&&(c=d[0],a.memory.output_container_id=c.id));if(!c){c=a.pos.findInRange(FIND_CONSTRUCTION_SITES,1,filter=function(a){return a.structureType==STRUCTURE_CONTAINER});if(c.length)b=c[0];else return b=b.pos.getDirectionTo(a),b=a.pos.step(b).createConstructionSite(STRUCTURE_CONTAINER),{outcome:"continue"};a.add_task({type:"construct",
target_id:b.id,resupply:"harvest"});return{outcome:"continue"}}if(c&&(c.structureType!=STRUCTURE_CONTAINER||1!=c.pos.getRangeTo(a)))return a.say("umm"),a.memory.output_container_id=null,{outcome:"continue"};b=a.harvest(b);b==OK?a.memory.no_driveby_repair=!0:b==ERR_NOT_ENOUGH_RESOURCES&&(a.memory.no_driveby_repair=!1);c.hits<c.hitsMax/2?a.repair(c):a.transfer(c,RESOURCE_ENERGY);return{outcome:"continue"}}};task_manager.register(roleCow.name,roleCow.run);module.exports=roleCow;
