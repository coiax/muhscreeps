var util=require("util"),task_manager=require("task_manager");
module.exports={name:"role.supplier",parts:null,part_generator:function(){module.exports.parts=[[CARRY,WORK,MOVE]];for(var e=module.exports.parts,a=1,d=1;;){var b=[];a++;0==a%2&&d++;for(var c=0;c<a;c++)b.push(CARRY);3>a&&b.push(WORK);for(c=0;c<d;c++)b.push(MOVE);if(50<b.length)break;else e.push(b)}},run:function(e,a){if(0==a.carry.energy)return a.add_task({type:"resupply"}),{outcome:"continue"};var d=[[STRUCTURE_EXTENSION,STRUCTURE_SPAWN],STRUCTURE_TOWER,STRUCTURE_STORAGE],b,c;for(c in d){var f=d[c];
if(b=a.pos.findClosestByRange(FIND_MY_STRUCTURES,{filter:function(a){return util.needs_energy(a)&&a.is_type(f)}}))break}b?a.add_task({type:"transfer_energy",target_id:b.id}):(a.say("sidle"),a.move(Math.floor(8*Math.random()+1)));return{outcome:"continue"}}};task_manager.register(module.exports.name,module.exports.run);module.exports.part_generator();
