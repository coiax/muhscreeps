module.exports={name:"role.dumbscout",parts:[[MOVE],[MOVE,TOUGH],[MOVE,MOVE,TOUGH,TOUGH]],run:function(e,d){var a=Game.map.describeExits(d.room.name);console.log(a);var b=[],f;for(f in a)b.push(f);console.log(b);for(var c;b.length&&!c;)console.log(c),a=_.sample(b),_.pull(b,a),c=d.pos.findClosestByRange(a);if(c)return e={type:"move_to",destination_pos:c},{outcome:"newtask",task:e};d.say("bluh");return{outcome:"continue"}}};require("task_manager").register(module.exports.name,module.exports.run);
