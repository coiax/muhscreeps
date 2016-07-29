var util=require("util");function generate_default_parts(){for(var a=1;;){for(var b=[],c=0;c<a;c++)b.push(WORK);for(c=0;c<a;c++)b.push(CARRY);for(c=0;c<a;c++)b.push(MOVE);if(50>=b.length)default_parts.push(b),a++;else break}}var default_parts=[];generate_default_parts();
function build_creep(a,b,c){var d,e;b.currently_attempting=c;try{e=require(c)}catch(k){console.log("Error importing task '"+c+"': "+k)}d=default_parts;e&&e.parts&&(d=e.parts);e=a.room.energyAvailable;var g,f;for(f in d){var h=d[f];if(util.body_cost(h)<=e)g=h;else break}if(g){for(d=c.replace(".","_")+b.creep_id;;)if(f=a.canCreateCreep(g,d),f==OK){b.currently_spawning=c;break}else if(f==ERR_NAME_EXISTS)b.creep_id++;else return;b.creep_id++;a.createCreep(g,d,{task_queue:[{type:c}],support:a.name});a.support_creep(Game.creeps[d])}}
function setup(a,b){"undefined"==typeof a.creep_id&&(a.creep_id=1);a.currently_attempting=null;b.spawning||(a.currently_spawning=null)}
module.exports={name:"structure.spawner",run:function(a,b){setup(a,b);b.check_creeps();counts={};required=[{task:"role.supplier",amount:1},{task:"role.cow",amount:1},{task:"role.upgrader",amount:1},{task:"role.builder",amount:1},{task:"role.cow",amount:2},{task:"role.supplier",amount:2},{task:"role.cow",amount:3},{task:"role.supplier",amount:3},{task:"role.cow",amount:4},{task:"role.supplier",amount:4},{task:"role.upgrader",amount:3},{task:"role.builder",amount:4},{task:"role.dumbscout",amount:10},
{task:"role.claimer",amount:1}];for(var c in required){var d=required[c];if(!counts[d.task]){var e=util.get_creeps_with_task(d.task);counts[d.task]=e.length}if(counts[d.task]<d.amount){build_creep(b,a,d.task);break}}return{outcome:"continue"}}};require("task_manager").register(module.exports.name,module.exports.run);
