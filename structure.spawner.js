var util=require("util"),default_parts=[[WORK,CARRY,MOVE],[WORK,WORK,CARRY,CARRY,MOVE,MOVE],[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]];
function build_creep(b,e,d){var a,c;e.currently_attempting=d;try{c=require(d)}catch(k){console.log("Error importing task '"+d+"': "+k)}c?c.parts&&(a=c.parts):a=default_parts;c=b.room.energyAvailable;var g,f;for(f in a){var h=a[f];if(util.body_cost(h)<=c)g=h;else break}if(g){for(a=d.replace(".","_")+e.creep_id;!(f=b.canCreateCreep(g,a),f==OK);)if(f==ERR_NAME_EXISTS)e.creep_id++;else return;e.creep_id++;b.createCreep(g,a,{task_queue:[{type:d}]})}}
function setup(b){"undefined"==typeof b.creep_id&&(b.creep_id=1)}
module.exports={name:"structure.spawner",run:function(b,e){setup(b);counts={};required=[{task:"role.supplier",amount:1},{task:"role.cow",amount:1},{task:"role.upgrader",amount:1},{task:"role.builder",amount:1},{task:"role.cow",amount:2},{task:"role.supplier",amount:2},{task:"role.cow",amount:3},{task:"role.supplier",amount:3},{task:"role.cow",amount:4},{task:"role.supplier",amount:4},{task:"role.upgrader",amount:3},{task:"role.builder",amount:4},{task:"role.guard",amount:3}];for(var d in required){var a=
required[d];if(!counts[a.task]){var c=util.get_creeps_with_task(a.task);counts[a.task]=c.length}if(counts[a.task]<a.amount){build_creep(e,b,a.task);break}}return{outcome:"continue"}}};require("task_manager").register(module.exports.name,module.exports.run);
