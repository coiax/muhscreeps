var roleGuard={run:function(a){var b=a.room.findClosestByPath(FIND_HOSTILE_CREEPS);b&&(3>=a.pos.getRangeTo(b)?(a.say("pew"),a.rangedAttack(b)):a.moveTo(b))}};module.exports=roleGuard;
