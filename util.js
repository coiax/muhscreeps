function needs_energy(a){return!a.isActive()||"undefined"==typeof a.energy||"undefined"==typeof a.energyCapacity?!1:a.energy<a.energyCapacity}function is_damaged(a){return"undefined"==typeof a.hits||"undefined"==typeof a.hitsMax?!1:a.hits<a.hitsMax}function cpulog(a){console.log(Game.cpu.getUsed()+" "+a)}function mean(a){var b=0;a.forEach(function(a){b+=a});return b/a.length}
function standard_deviation(a){var b=mean(a),c=0;a.forEach(function(a){c+=Math.pow(a-b,2)});c/=a.length;return Math.pow(c,0.5)}
module.exports={opposite_dir:function(a){a+=4;8<a&&(a-=8);return a},body_cost:function(a){var b=0;a.forEach(function(a){b+=BODYPART_COST[a]});return b},needs_energy:needs_energy,is_damaged:is_damaged,cpulog:cpulog,mean:mean,standard_deviation:standard_deviation,memoryPosition:function(a){return a?new RoomPosition(a.x,a.y,a.roomName):null},get_creeps_with_task:function(a){var b=[],c;for(c in Game.creeps){var d=Game.creeps[c];d.has_task_in_queue(a)&&b.push(d)}return b}};
