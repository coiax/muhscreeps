function minimum_creeps(a,d){if(_.filter(Game.creeps,function(b){return b.memory.role==a}).length<d){var b=a+Memory.muhid,c=Game.spawns.Spawn2;c.createCreep(400<=c.room.energyCapacityAvailable?"guard"==a?[RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE]:[WORK,WORK,CARRY,CARRY,MOVE,MOVE]:"guard"==a?[RANGED_ATTACK,MOVE]:[WORK,CARRY,MOVE],b,{role:a})==b&&Memory.muhid++}}
module.exports={run:function(){"undefined"==typeof Memory.muhid&&(Memory.muhid=1);for(var a in Memory.creeps)Game.creeps[a]||delete Memory.creeps[a];minimum_creeps("guard",2);minimum_creeps("builder",2);minimum_creeps("upgrader",4);minimum_creeps("harvester",2);minimum_creeps("cow",4)}};
