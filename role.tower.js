var util=require("util");
module.exports={run:function(b){var a,c;a||(a=b.pos.findClosestByRange(FIND_HOSTILE_CREEPS),c="attack");a||(a=b.pos.findClosestByRange(FIND_MY_STRUCTURES,{filter:util.is_damaged}),c="repair");[STRUCTURE_CONTAINER,STRUCTURE_ROAD,STRUCTURE_WALL].forEach(function(d){a||(d=b.pos.findDamagedStructures(d),d.length&&(a=b.pos.findClosestByRange(d),c="repair"))});if(!a){var e=b.pos.findDamagedFriendlyCreeps();a=b.pos.findClosestByRange(e);c="heal"}a&&b.add_task({type:"tower_target",target_id:a.id,mode:c})}};
