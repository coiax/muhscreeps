var util=require("util"),task_manager=require("task_manager");
module.exports={name:"structure.tower",run:function(e,b){var a,c;a||(a=b.pos.findClosestByRange(FIND_HOSTILE_CREEPS),c="attack");a||(a=b.pos.findDamagedFriendlyCreeps(),a=b.pos.findClosestByRange(a),c="heal");a||(a=b.pos.findClosestByRange(FIND_MY_STRUCTURES,{filter:function(a){return a.structureType!=STRUCTURE_RAMPART&&a.hits<a.hitsMax}}),c="repair");if(!a&&0==Game.time%10){var f=[STRUCTURE_CONTAINER,STRUCTURE_ROAD,[STRUCTURE_WALL,STRUCTURE_RAMPART]],g;for(g in f){var d=b.pos.findDamagedStructures(f[g]),
d=_.sortBy(d,_.property("hits"));if(d.length){a=d[0];c="repair";break}}}return a?(e={type:"tower_target",target_id:a.id,mode:c},{outcome:"newtask",task:e}):{outcome:"continue"}}};task_manager.register(module.exports.name,module.exports.run);
