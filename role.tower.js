var util=require("util");
module.exports={run:function(b){var a,c;a||(a=b.pos.findClosestByRange(FIND_HOSTILE_CREEPS),c="attack");a||(a=b.pos.findClosestByRange(FIND_MY_STRUCTURES,{filter:util.is_damaged}),c="repair");var f=[STRUCTURE_CONTAINER,STRUCTURE_ROAD,STRUCTURE_WALL],d;for(d in f){var g=f[d],e=b.pos.findDamagedStructures(d);console.log(g+e);if(e.length){a=b.pos.findClosestByRange(e);c="repair";break}}a||(a=b.pos.findDamagedFriendlyCreeps(),a=b.pos.findClosestByRange(a),c="heal");a&&b.add_task({type:"tower_target",target_id:a.id,
mode:c})}};
