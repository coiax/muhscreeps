function sort_construction_sites(a){return _.sortBy(a,function(a){return a.progress-a.progressTotal})}function sort_structures(a){return _.sortBy(a,function(a){return a.hits-a.hitsMax})}
var roleBuilder={run:function(a){if(0==a.carry.energy)a.add_task({type:"harvest"});else{var c=a.pos.findClosestByPath(FIND_CONSTRUCTION_SITES),d=sort_structures(a.room.find(FIND_MY_STRUCTURES,{filter:function(a){return a.hits<a.hitsMax}})),e=sort_structures(a.room.find(FIND_STRUCTURES,{filter:function(a){return a.hits<a.hitsMax}})),b;c?b=c:d.length?b=d[0]:e.length&&(b=e[0]);b?a.add_task({type:"construct",target_id:b.id}):a.say("no work")}}};module.exports=roleBuilder;
