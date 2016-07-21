var roleGuard = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(!target) {
            var flag = Game.flags["Campfire"];
            if(flag && (creep.pos.getRangeTo(flag) > 3)) {
                creep.moveTo(flag);
            }
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
