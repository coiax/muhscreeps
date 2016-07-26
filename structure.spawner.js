var util=require("util");function generate_default_parts(){for(counter=1;;){for(var b=[],a=0;a<counter;a++)b.push(WORK);for(a=0;a<counter;a++)b.push(CARRY);for(a=0;a<counter;a++)b.push(MOVE);if(50>=b.length)default_parts.push(b),counter++;else break}}var default_parts=[];generate_default_parts();
function build_creep(b,a,d){var c,e;a.currently_attempting=d;try{e=require(d)}catch(k){console.log("Error importing task '"+d+"': "+k)}c=default_parts;e&&e.parts&&(c=e.parts);e=b.room.energyAvailable;var g,f;for(f in c){var h=c[f];if(util.body_cost(h)<=e)g=h;else break}if(g){for(c=d.replace(".","_")+a.creep_id;;)if(f=b.canCreateCreep(g,c),f==OK){a.currently_spawning=d;break}else if(f==ERR_NAME_EXISTS)a.creep_id++;else return;a.creep_id++;b.createCreep(g,c,{task_queue:[{type:d}]})}}
function setup(b,a){"undefined"==typeof b.creep_id&&(b.creep_id=1);b.currently_attempting=null;a.spawning||(b.currently_spawning=null)}
module.exports={name:"structure.spawner",run:function(b,a){setup(b,a);counts={};required=[{task:"role.supplier",amount:1},{task:"role.cow",amount:1},{task:"role.upgrader",amount:1},{task:"role.builder",amount:1},{task:"role.cow",amount:2},{task:"role.supplier",amount:2},{task:"role.cow",amount:3},{task:"role.supplier",amount:3},{task:"role.cow",amount:4},{task:"role.supplier",amount:4},{task:"role.upgrader",amount:3},{task:"role.builder",amount:4},{task:"role.dumbscout",amount:10},{task:"role.guard",
amount:3},{task:"role.claimer",amount:1}];for(var d in required){var c=required[d];if(!counts[c.task]){var e=util.get_creeps_with_task(c.task);counts[c.task]=e.length}if(counts[c.task]<c.amount){build_creep(a,b,c.task);break}}return{outcome:"continue"}}};require("task_manager").register(module.exports.name,module.exports.run);
