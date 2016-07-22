var util=require("util");RoomPosition.prototype.ordinals=function(){var a=this.x,b=this.y,c=this.roomName,a=[new RoomPosition(a+1,b+1,c),new RoomPosition(a+0,b+1,c),new RoomPosition(a-1,b+1,c),new RoomPosition(a+1,b+0,c),new RoomPosition(a-1,b+0,c),new RoomPosition(a+1,b-1,c),new RoomPosition(a+0,b-1,c),new RoomPosition(a-1,b-1,c)];return _.compact(a)};
RoomPosition.prototype.cardinals=function(){var a=this.x,b=this.y,c=this.roomName,a=[new RoomPosition(a+1,b+0,c),new RoomPosition(a-1,b+0,c),new RoomPosition(a+0,b+1,c),new RoomPosition(a+0,b-1,c)];return _.compact(a)};
RoomPosition.prototype.step=function(a){var b=this.x,c=this.y,d=this.roomName;switch(a){case TOP:c-=1;break;case TOP_RIGHT:b+=1;c-=1;break;case RIGHT:b+=1;break;case BOTTOM_RIGHT:b+=1;c+=1;break;case BOTTOM:c+=1;break;case BOTTOM_LEFT:b-=1;c+=1;break;case LEFT:b-=1;break;case TOP_LEFT:b-=1,c-=1}return new RoomPosition(b,c,d)};RoomPosition.prototype.is_terrain=function(a){var b=this.look(),c;for(c in b){var d=b[c];if("terrain"==d.type&&d.terrain==a)return!0}return!1};
RoomPosition.prototype.is_swamp=function(){return this.is_terrain("swamp")};RoomPosition.prototype.is_wall=function(){return this.is_terrain("wall")};RoomPosition.prototype.is_plain=function(){return is_terrain("plain")};RoomPosition.prototype.non_wall_adjacent=function(){return _.reject(this.ordinals(),function(a){return a.is_wall()})};function memoryPosition(a){return a?new RoomPosition(a.x,a.y,a.roomName):null}
var roleCow={parts:[[WORK,CARRY,MOVE],[WORK,WORK,CARRY,MOVE],[WORK,WORK,WORK,CARRY,MOVE,MOVE],[WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE],[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]],run:function(a){var b=Game.getObjectById(a.memory.source_id);if(!b){a.say("l4s");var b=a.room.find(FIND_SOURCES),c={};b.forEach(function(a){c[a]=0});for(var d in Game.creeps){var e=Game.creeps[d];if(a.name!=e.name&&"cow"==e.memory.role){var g=Game.getObjectById(e.memory.source_id);
c[g]++}}b=_.sortBy(b,function(a){return c[a]});if(b=b[0])a.memory.source_id=b.id}if(b){e=memoryPosition(a.memory.pasture_loc);if(!e){var f=b.pos.non_wall_adjacent();for(d in Game.creeps)if(d!=a.name&&(e=Game.creeps[d],"cow"==e.memory.role&&(g=Game.getObjectById(e.memory.source_id),g==b))){console.log("cow "+d+" is using source "+b);var h=memoryPosition(e.memory.pasture_loc);console.log("they are using: "+h);console.log("before:"+f);_.remove(f,function(a){return h.isEqualTo(a)});console.log("after:"+
f)}e=_.sample(f);a.memory.pasture_loc=e}e.is_wall()||1!=e.getRangeTo(b)?(a.say("!ploc"),a.memory.debug_bad_pasture_loc=e,a.memory.pasture_loc=null):e.isEqualTo(a.pos)?(d=Game.getObjectById(a.memory.output_container_id),d||(e=a.pos.findInRange(FIND_STRUCTURES,1,{filter:function(a){return a.structureType==STRUCTURE_CONTAINER}}),e.length&&(d=e[0],a.memory.output_container_id=d.id)),d?d&&(d.structureType!=STRUCTURE_CONTAINER||1!=d.pos.getRangeTo(a))?(a.say("umm"),a.memory.output_container_id=null):(b=
a.harvest(b),b==OK?a.memory.no_driveby_repair=!0:b==ERR_NOT_ENOUGH_RESOURCES&&(a.memory.no_driveby_repair=!1),d.hits<d.hitsMax/2?a.repair(d):a.transfer(d,RESOURCE_ENERGY)):(d=a.pos.findInRange(FIND_CONSTRUCTION_SITES,1,filter=function(a){return a.structureType==STRUCTURE_CONTAINER}),d.length?(b=d[0],a.add_task({type:"construct",target_id:b.id,resupply:"harvest"})):(b=b.pos.getDirectionTo(a),b=a.pos.step(b).createConstructionSite(STRUCTURE_CONTAINER)))):a.moveTo(e)}else a.say("!?src")}};
module.exports=roleCow;
