var util = require('util');

RoomPosition.prototype.ordinals = function() {
    var _x = this.x;
    var _y = this.y;
    var _roomName = this.roomName;
    var out = [
        new RoomPosition(_x + 1, _y + 1, _roomName),
        new RoomPosition(_x + 0, _y + 1, _roomName),
        new RoomPosition(_x - 1, _y + 1, _roomName),
        new RoomPosition(_x + 1, _y + 0, _roomName),
        //new RoomPosition(_x + 0, _y + 0, _roomName),
        new RoomPosition(_x - 1, _y + 0, _roomName),
        new RoomPosition(_x + 1, _y - 1, _roomName),
        new RoomPosition(_x + 0, _y - 1, _roomName),
        new RoomPosition(_x - 1, _y - 1, _roomName)
    ];
    return _.compact(out);
};

RoomPosition.prototype.cardinals = function() {
    var _x = this.x;
    var _y = this.y;
    var _roomName = this.roomName;
    var out = [
        new RoomPosition(_x + 1, _y + 0, _roomName),
        new RoomPosition(_x - 1, _y + 0, _roomName),
        new RoomPosition(_x + 0, _y + 1, _roomName),
        new RoomPosition(_x + 0, _y - 1, _roomName)
    ];
    return _.compact(out);
};

RoomPosition.prototype.step = function(direction) {
    var x = this.x;
    var y = this.y;
    var roomName = this.roomName;
    switch(direction) {
        case TOP:
            y -= 1;
            break;
        case TOP_RIGHT:
            x += 1;
            y -= 1;
            break;
        case RIGHT:
            x += 1;
            break;
        case BOTTOM_RIGHT:
            x += 1;
            y += 1;
            break;
        case BOTTOM:
            y += 1;
            break;
        case BOTTOM_LEFT:
            x -= 1;
            y += 1;
            break;
        case LEFT:
            x -= 1;
            break;
        case TOP_LEFT:
            x -= 1;
            y -= 1;
            break;
    }
    return new RoomPosition(x, y, roomName);
};
RoomPosition.prototype.is_terrain = function(terrain_type) {
    var contains = this.look();
    for(var o in contains) {
        var obj = contains[o];
        if((obj.type == 'terrain') && (obj.terrain == terrain_type)) {
            return true;
        }
    }
    return false;
};

RoomPosition.prototype.is_swamp = function () {
    return this.is_terrain('swamp');
};

RoomPosition.prototype.is_wall = function () {
    return this.is_terrain('wall');
};

RoomPosition.prototype.is_plain = function () {
    return is_terrain('plain');
};

RoomPosition.prototype.non_wall_adjacent = function () {
    return _.reject(this.ordinals(), function(mp) {return mp.is_wall();});
};

function memoryPosition(obj) {
    if(obj) {
        return new RoomPosition(obj.x, obj.y, obj.roomName);
    } else {
        return null;
    }
}

var roleCow = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var source = Game.getObjectById(creep.memory.source_id);
        if(!source) {
            var sources = creep.room.find(FIND_SOURCES);
            source = _.sample(sources);
            if(source) {
                creep.memory.source_id = source.id;
            }
        }

        var pasture = memoryPosition(creep.memory.pasture_loc);

        if(!pasture) {
            pasture = _.sample(source.pos.non_wall_adjacent());
            creep.memory.pasture_loc = pasture;
        }
        if(pasture.is_wall() || (pasture.getRangeTo(source) != 1)) {
            creep.say("!ploc");
            creep.memory.debug_bad_pasture_loc = pasture;
            creep.memory.pasture_loc = null;
            return;
        }
        if(!pasture.isEqualTo(creep.pos)) {
            creep.moveTo(pasture);
            return;
        }

        var container = Game.getObjectById(creep.memory.output_container_id);
        if(!container) {
            // Then scan for a container to move stuff into
            var containers = creep.pos.findInRange(FIND_STRUCTURES, 1,
                {filter : function(structure) {
                    return structure.structureType == STRUCTURE_CONTAINER;
            }});
            if(containers.length) {
                container = containers[0];
                creep.memory.output_container_id = container.id;
            }
        }

        // If not present, then place the construction site and then
        // build it
        if(!container) {
            var sites = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 1,
                filter = function(site) {
                    return site.structureType == STRUCTURE_CONTAINER;
            });
            var site;
            if(sites.length) {
                site = sites[0];
            } else {
                var opposite_dir = source.pos.getDirectionTo(creep);
                var site_pos = creep.pos.step(opposite_dir);
                var rc = site_pos.createConstructionSite(STRUCTURE_CONTAINER);
                // It will be found next work tick.
                return;
            }
            creep.add_task({type: "construct", target: site.id, resupply:true});
            return;
        }
        if(container && container.structureType != STRUCTURE_CONTAINER) {
            creep.say("umm");
            creep.memory.output_container_id = null;
            return;
        }
        // Then spend the rest of our lifespan harvesting and moving that
        // into the container, repairing the container first if needed.
        // The priority system SHOULD just make this all happen.
        creep.harvest(source);
        // if for some reason the container isn't repaired by others
        // and it drops to half health, then fix it up, but the cow should
        // focus on just harvesting as much as possible
        if(container.hits < (container.hitsMax / 2)) {
            creep.repair(container);
        } else {
            creep.transfer(container, RESOURCE_ENERGY);
        }
    }
};

module.exports = roleCow;
