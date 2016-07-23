module.exports={gc:function(){for(var a in Memory.structures)Game.structures[a]||delete Memory.structures[a];for(var b in Memory.creeps)Game.creeps[b]||delete Memory.creeps[b]}};
