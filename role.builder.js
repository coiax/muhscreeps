function sort_construction_sites(a){return _.sortBy(a,function(a){return a.progress-a.progressTotal})}function sort_structures(a){return _.sortBy(a,function(a){return a.hits-a.hitsMax})}
var roleBuilder={run:function(a){if(0==a.carry.energy)a.say("need energy"),a.memory.generic_action="harvest",a.memory.repair_target_id=null;else{if(!a.memory.repair_target_id){var b=sort_construction_sites(a.room.find(FIND_CONSTRUCTION_SITES)),d=sort_structures(a.room.find(FIND_MY_STRUCTURES,{filter:function(a){return a.hits<a.hitsMax}})),e=sort_structures(a.room.find(FIND_STRUCTURES,{filter:function(a){return a.hits<a.hitsMax}})),c;b.length?c=b[0]:d.length?c=d[0]:e.length&&(c=e[0]);c&&(a.memory.repair_target_id=
c.id)}a.memory.repair_target_id&&((b=Game.getObjectById(a.memory.repair_target_id))?b.hits==b.hitsMax?(a.say("all fixed :D"),a.memory.repair_target_id=null):a.repair(b)==ERR_NOT_IN_RANGE&&a.moveTo(b):(a.memory.repair_target_id=null,a.say("it vanished?")))}}};module.exports=roleBuilder;
