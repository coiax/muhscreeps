module.exports={name:"role.looter",parts:null,generate_parts:function(){module.exports.parts=[[CARRY,MOVE]];var c=module.exports.parts;for(counter=1;;){for(var b=[],a=0;a<2*counter;a++)b.push(CARRY);for(a=0;a<counter;a++)b.push(MOVE);if(50<b.length)break;else c.push(b)}},run:function(c,b){var a=[STRUCTURE_CONTAINER,STRUCTURE_STORAGE];if(0!=b.carryCapacity-b.carry.energy){var d=Game.flags.Loot;if(!d)return b.say("noflag"),{outcome:"continue"};a=d.pos.findStructures(a);if(!a.length)return b.say("nostru"),
{outcome:"continue"};c={type:"resupply",gas_station_id:a[0].id}}else{d=Game.flags.Dropoff;if(!d)return b.say("noflg2"),{outcome:"continue"};a=d.pos.findStructures(a);if(!a.length)return b.say("nostru"),{outcome:"continue"};c={type:"transfer_energy",target_id:a[0].id}}return{outcome:"newtask",task:c}}};require("task_manager").register(module.exports.name,module.exports.run);module.exports.generate_parts();
