var util=require("util"),roleHarvester={run:function(a){console.log("harvester: "+a+" CPU:"+Game.cpu.getUsed());if(0==a.carry.energy)a.add_task({type:"resupply"});else{var d=[STRUCTURE_EXTENSION,STRUCTURE_SPAWN,STRUCTURE_TOWER],b,e;for(e in d){var c=a.pos.findNeedingEnergyStructures(d[e]);if(1<c.length){b=a.pos.findClosestByRange(c);break}else if(1==c.length){b=c[0];break}}b?a.add_task({type:"transfer_energy",target_id:b.id}):a.move(Math.floor(8*Math.random()+1))}}};module.exports=roleHarvester;
