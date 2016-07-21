function sort_construction_sites(con_sites) {
    return _.sortBy(con_sites, function(con_site) {
        return con_site.progress - con_site.progressTotal;
    });
}

function sort_structures(structs) {
    return _.sortBy(structs, function(struct) {
        return struct.hits - struct.hitsMax;
    });
}

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0) {
            creep.add_task({type: "resupply"})
            return;
        }

        var con_site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        var dam_struct = sort_structures(
            creep.room.find(FIND_MY_STRUCTURES, {
                filter: function(structure) {
                    return structure.hits < structure.hitsMax
            }}));
        var dam_neu_struct = sort_structures(
            creep.room.find(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.hits < structure.hitsMax
            }}));
        var target;
        if(con_site) {
            target = con_site;
        } else if(dam_struct.length) {
            target = dam_struct[0];
        } else if(dam_neu_struct.length) {
            target = dam_neu_struct[0];
        }
        if(target) {
            creep.add_task({type: "construct", target_id: target.id})
        } else {
            creep.say("no work");
        }
    }
};

module.exports = roleBuilder;
