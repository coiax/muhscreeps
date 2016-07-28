var util=require("util");function generate_default_parts(){for(counter=1;;){for(var a=[],b=0;b<counter;b++)a.push(WORK);for(b=0;b<counter;b++)a.push(CARRY);for(b=0;b<counter;b++)a.push(MOVE);if(50>=a.length)default_parts.push(a),counter++;else break}}var default_parts=[];generate_default_parts();
function build_creep(a,b,e){var c,d;b.currently_attempting=e;try{d=require(e)}catch(k){console.log("Error importing task '"+e+"': "+k)}c=default_parts;d&&d.parts&&(c=d.parts);d=a.room.energyAvailable;var g,f;for(f in c){var h=c[f];if(util.body_cost(h)<=d)g=h;else break}if(g){for(c=e.replace(".","_")+b.creep_id;;)if(f=a.canCreateCreep(g,c),f==OK){b.currently_spawning=e;break}else if(f==ERR_NAME_EXISTS)b.creep_id++;else return;b.creep_id++;a.createCreep(g,c,{task_queue:[{type:e}],support:a.name});a=
a.memory;a.supported_creeps||(a.supported_creeps=[]);a.supported_creeps.push(c)}}function setup(a,b){b.memory.supported_creeps||(b.memory.supported_creeps=[]);_.remove(b.memory.supported_creeps,function(a,b,d){return!Game.creeps[a]});"undefined"==typeof a.creep_id&&(a.creep_id=1);a.currently_attempting=null;b.spawning||(a.currently_spawning=null)}
module.exports={name:"structure.spawner",run:function(a,b){setup(a,b);counts={};required=[{task:"role.supplier",amount:1},{task:"role.cow",amount:1},{task:"role.upgrader",amount:1},{task:"role.builder",amount:1},{task:"role.cow",amount:2},{task:"role.supplier",amount:2},{task:"role.cow",amount:3},{task:"role.supplier",amount:3},{task:"role.cow",amount:4},{task:"role.supplier",amount:4},{task:"role.upgrader",amount:3},{task:"role.builder",amount:4},{task:"role.dumbscout",amount:10},{task:"role.guard",
amount:3},{task:"role.claimer",amount:1}];for(var e in required){var c=required[e];if(!counts[c.task]){var d=util.get_creeps_with_task(c.task);counts[c.task]=d.length}if(counts[c.task]<c.amount){build_creep(b,a,c.task);break}}return{outcome:"continue"}}};require("task_manager").register(module.exports.name,module.exports.run);
