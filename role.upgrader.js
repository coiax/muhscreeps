var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0) {
            creep.add_task({type: "harvest"});
        }
        var rc = creep.upgradeController(creep.room.controller);
        if(rc == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = roleUpgrader;
