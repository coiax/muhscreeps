var util=require("util"),task_manager=require("task_manager");
module.exports={name:role.tower,run:function(b){var a,c;a||(a=b.pos.findClosestByRange(FIND_HOSTILE_CREEPS),c="attack");a||(a=b.pos.findClosestByRange(FIND_MY_STRUCTURES,{filter:util.is_damaged}),c="repair");[STRUCTURE_CONTAINER,STRUCTURE_ROAD,STRUCTURE_WALL].forEach(function(d){a||(d=b.pos.findDamagedStructures(d),d.length&&(a=b.pos.findClosestByRange(d),c="repair"))});if(!a){var e=b.pos.findDamagedFriendlyCreeps();a=b.pos.findClosestByRange(e);c="heal"}return a?{outcome:"newtask",task:{type:"tower_target",
target_id:a.id,mode:c}}:{outcome:"continue"}}};task_manager.register(module.exports.name,module.exports.run);
