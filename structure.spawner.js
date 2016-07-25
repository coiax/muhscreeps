var util=require("util"),default_parts=[[WORK,CARRY,MOVE],[WORK,WORK,CARRY,CARRY,MOVE,MOVE],[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
function build_creep(b,c,d){var a;a=require(d);a=module?a.parts:default_parts;var g=b.room.energyAvailable,f,e;for(e in a){var h=a[e];if(util.body_cost(h)<=g)f=h;else break}if(f){for(e=d.replace(".","_")+c.creep_id;!(a=b.canCreateCreep(f,e),a==OK);)if(a==ERR_NAME_EXISTS)c.creep_id++;else return;c.creep_id++;b.createCreep(f,e,{task_queue:[{type:d}]})}}function setup(b){"undefined"==typeof b.creep_id&&(b.creep_id=1)}
module.exports={name:"structure.spawner",run:function(b,c){setup(b);counts={};required=[{task:"role.supplier",amount:1},{task:"role.cow",amount:1},{task:"role.upgrader",amount:1},{task:"role.builder",amount:1},{task:"role.cow",amount:2},{task:"role.supplier",amount:2},{task:"role.cow",amount:3},{task:"role.supplier",amount:3},{task:"role.cow",amount:4},{task:"role.supplier",amount:4},{task:"role.upgrader",amount:3},{task:"role.builder",amount:4},{task:"role.guard",amount:3}];for(var d in required){var a=
required[d];if(!counts[a.task]){var g=util.get_creeps_with_task(a.task);counts[a.task]=g.length}if(counts[a.task]<a.amount){build_creep(c,b,a.task);break}}return{outcome:"continue"}}};require("task_manager").register(module.exports.name,module.exports.run);
