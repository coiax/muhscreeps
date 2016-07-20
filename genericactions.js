module.exports={harvest:function(a){var b=a.room.find(FIND_SOURCES)[0];a.harvest(b)==ERR_NOT_IN_RANGE&&a.moveTo(b);a.carryCapacity==a.carry.energy&&(a.memory.generic_action=null)}};
