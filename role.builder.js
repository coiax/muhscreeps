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
            creep.say("I refuel");
            creep.add_task({type: "harvest"})
            return;
        }

        var con_sites = sort_construction_sites(
            creep.room.find(FIND_CONSTRUCTION_SITES));
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
        if(con_sites.length) {
            target = con_sites[0];
        } else if(dam_struct.length) {
            target = dam_struct[0];
        } else if(dam_neu_struct.length) {
            target = dam_neu_struct[0];
        }
        if(target) {
            creep.add_task({type: "construct", target: target.id})
        } else {
            creep.say("no work");
        }
    }
};

module.exports = roleBuilder;
