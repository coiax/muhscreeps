var util=require("util");RoomPosition.prototype.ordinals=function(){var a=this.x,c=this.y,b=this.roomName,a=[new RoomPosition(a+1,c+1,b),new RoomPosition(a+0,c+1,b),new RoomPosition(a-1,c+1,b),new RoomPosition(a+1,c+0,b),new RoomPosition(a-1,c+0,b),new RoomPosition(a+1,c-1,b),new RoomPosition(a+0,c-1,b),new RoomPosition(a-1,c-1,b)];return _.compact(a)};
RoomPosition.prototype.cardinals=function(){var a=this.x,c=this.y,b=this.roomName,a=[new RoomPosition(a+1,c+0,b),new RoomPosition(a-1,c+0,b),new RoomPosition(a+0,c+1,b),new RoomPosition(a+0,c-1,b)];return _.compact(a)};
RoomPosition.prototype.step=function(a){var c=this.x,b=this.y,d=this.roomName;switch(a){case TOP:b-=1;break;case TOP_RIGHT:c+=1;b-=1;break;case RIGHT:c+=1;break;case BOTTOM_RIGHT:c+=1;b+=1;break;case BOTTOM:b+=1;break;case BOTTOM_LEFT:c-=1;b+=1;break;case LEFT:c-=1;break;case TOP_LEFT:c-=1,b-=1}return new RoomPosition(c,b,d)};RoomPosition.prototype.is_terrain=function(a){var c=this.look(),b;for(b in c){var d=c[b];if("terrain"==d.type&&d.terrain==a)return!0}return!1};
RoomPosition.prototype.is_swamp=function(){return this.is_terrain("swamp")};RoomPosition.prototype.is_wall=function(){return this.is_terrain("wall")};RoomPosition.prototype.is_plain=function(){return is_terrain("plain")};RoomPosition.prototype.non_wall_adjacent=function(){return _.reject(this.ordinals(),function(a){return a.is_wall()})};function memoryPosition(a){return a?new RoomPosition(a.x,a.y,a.roomName):null}
var roleCow={run:function(a){var c=Game.getObjectById(a.memory.source_id);if(!c&&(c=a.room.find(FIND_SOURCES),c=_.sample(c)))a.memory.source_id=c.id;var b=memoryPosition(a.memory.pasture_loc);b||(b=_.sample(c.pos.non_wall_adjacent()),a.memory.pasture_loc=b);if(b.is_wall()||1!=b.getRangeTo(c))a.say("!ploc"),a.memory.debug_bad_pasture_loc=b,a.memory.pasture_loc=null;else if(b.isEqualTo(a.pos)){b=Game.getObjectById(a.memory.output_container_id);if(!b){var d=a.pos.findInRange(FIND_STRUCTURES,1,filter=
function(a){return a.structureType==STRUCTURE_CONTAINER});d.length&&(b=d[0],a.memory.output_container_id=b.id)}b?(a.harvest(c),a.repair(b),a.transfer(b,RESOURCE_ENERGY)):(b=a.pos.findInRange(FIND_CONSTRUCTION_SITES,1,filter=function(a){return a.structureType==STRUCTURE_CONTAINER}),b.length?(c=b[0],a.add_task({type:"construct",target:c.id,resupply:!0})):(c=c.getDirectionTo(a),a.pos.step(c).createConstructionSite(STRUCTURE_CONTAINER)))}else a.moveTo(b)}};module.exports=roleCow;
