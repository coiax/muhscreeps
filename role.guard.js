var roleGuard = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var target = creep.room.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(!target) {
            return;
        }
        var range = creep.pos.getRangeTo(target);
        if(range <= 3) {
            creep.say("pew");
            creep.rangedAttack(target);
        } else {
            creep.moveTo(target);
        }
    }
};

module.exports = roleGuard;
