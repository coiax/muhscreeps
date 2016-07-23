RoomPosition.prototype.find=function(){var a=Game.rooms[this.roomName];return a.find.apply(a,arguments)};RoomPosition.prototype.findStructures=function(a){return a?(a.constructor!=Array&&(a=[a]),filter=function(b){return _.includes(a,b.structureType)},this.find(FIND_STRUCTURES,{filter:filter})):this.find(FIND_STRUCTURES)};RoomPosition.prototype.findDamagedStructures=function(a){return _.filter(this.findStructures(a),is_damaged)};
RoomPosition.prototype.findNeedingEnergyStructures=function(a){return _.filter(this.findStructures(a),needs_energy)};RoomPosition.prototype.findDamagedFriendlyCreeps=function(){return this.find(FIND_MY_CREEPS,{filter:is_damaged})};function needs_energy(a){return!a.isActive()||"undefined"==typeof a.energy||"undefined"==typeof a.energyCapacity?!1:a.energy<a.energyCapacity}function is_damaged(a){return"undefined"==typeof a.hits||"undefined"==typeof a.hitsMax?!1:a.hits<a.hitsMax}
function cpulog(a){console.log(Game.cpu.getUsed()+" "+a)}module.exports={opposite_dir:function(a){a+=4;8<a&&(a-=8);return a},body_cost:function(a){var b=0;a.forEach(function(a){b+=BODYPART_COST[a]});return b},needs_energy:needs_energy,is_damaged:is_damaged,cpulog:cpulog};
