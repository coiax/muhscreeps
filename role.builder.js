function sort_construction_sites(a){return _.orderBy(a,function(a){return a.progressTotal-a.progress},"desc")}function sort_structures(a){return _.sortBy(a,function(a){return a.hits})}
var roleBuilder={run:function(a){if(0==a.carry.energy)a.add_task({type:"resupply"});else{var b=Game.flags.Dismantle;if(b){var c=b.pos.findInRange(FIND_STRUCTURES,0);if(c&&c.length){a.add_task({type:"dismantle",target:c[0].id});return}b.remove()}var b=a.pos.findClosestByRange(FIND_CONSTRUCTION_SITES),c=sort_structures(a.room.find(FIND_MY_STRUCTURES,{filter:function(a){return a.hits<a.hitsMax}})),e=sort_structures(a.room.find(FIND_STRUCTURES,{filter:function(a){return a.hits<a.hitsMax}})),d;b?d=b:c.length?
d=c[0]:e.length&&(d=e[0]);d?a.add_task({type:"construct",target_id:d.id}):a.say("no work")}}};module.exports=roleBuilder;
