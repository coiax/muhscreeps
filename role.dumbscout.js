module.exports={name:"role.dumbscout",parts:[[MOVE],[MOVE,TOUGH],[MOVE,MOVE,TOUGH,TOUGH]],run:function(e,c){var b=Game.map.describeExits(c.room.name),a=[],f;for(f in b)a.push(f);for(var d;a.length&&!d;)b=_.sample(a),_.pull(a,b),d=c.pos.findClosestByRange(b);if(a.length)return e={type:"move_to",destination_pos:d},{outcome:"newtask",task:e};c.suicide();return{outcome:"continue"}}};require("task_manager").register(module.exports.name,module.exports.run);
