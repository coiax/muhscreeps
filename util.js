RoomPosition.prototype.findStructures=function(a){var d=_.identity;a&&(a.constructor!=Array&&(a=[a]),d=function(c){return _.includes(a,c.structureType)});return this.find(FIND_STRUCTURES,{filter:d})};RoomPosition.prototype.findDamagedStructures=function(a){return _.filter(this.findStructures(a),is_damaged)};RoomPosition.prototype.findNeedingEnergyStructures=function(a){return _.filter(this.findStructures(a),needs_energy)};
RoomPosition.prototype.findDamagedFriendlyCreeps=function(){return this.find(FIND_MY_CREEPS,{filter:is_damaged})};function needs_energy(a){return!a.isActive()||"undefined"==typeof a.energy||"undefined"==typeof a.energyCapacity?!1:a.energy<a.energyCapacity}function is_damaged(a){return"undefined"==typeof a.hits||"undefined"==typeof a.hitsMax?!1:a.hits<a.hitsMax}
module.exports={opposite_dir:function(a){a+=4;8<a&&(a-=8);return a},needs_energy:needs_energy,is_damaged:is_damaged,run_task_queue:function(a,d){for(;d&&d.length;){var c=d[0];"undefined"==typeof c.times_run&&(c.times_run=0);var e=a.say||function(a){},b=(0,genericActions[c.type])(c,a);if(b)if("done"==b.outcome)a.pop_task();else if("continue"==b.outcome)c.times_run++;else if("newtask"==b.outcome)c.times_run++,a.add_task(b.task);else if("replace"==b.outcome)a.pop_task(),a.add_task(b.task);else if("didnothing"==
b.outcome){a.pop_task();continue}else e("?"+b.outcome),a.pop_task();else e("!octq"),a.pop_task();break}}};
