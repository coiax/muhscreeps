var util = require('util');

RoomPosition.prototype.ordinals = function() {
    var out = [
        new RoomPosition(this.x + 1, this.y + 1, this.roomName),
        new RoomPosition(this.x + 0, this.y + 1, this.roomName),
        new RoomPosition(this.x - 1, this.y + 1, this.roomName),
        new RoomPosition(this.x + 1, this.y + 0, this.roomName),
        //new RoomPosition(this.x + 0, this.y + 0, this.roomName),
        new RoomPosition(this.x - 1, this.y + 0, this.roomName),
        new RoomPosition(this.x + 1, this.y - 1, this.roomName),
        new RoomPosition(this.x + 0, this.y - 1, this.roomName),
        new RoomPosition(this.x - 1, this.y - 1, this.roomName)
    ];
    return _.compact(out);
};

RoomPosition.prototype.cardinals = function() {
    var out = [
        new RoomPosition(this.x + 1, this.y + 0, this.roomName),
        new RoomPosition(this.x - 1, this.y + 0, this.roomName),
        new RoomPosition(this.x + 0, this.y + 1, this.roomName),
        new RoomPosition(this.x + 0, this.y - 1, this.roomName)
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
    return new RoomPosition(obj.x, obj.y, obj.roomName);
}

var roleCow = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Bookkeeping.
        if (typeof creep.room.memory.cows == 'undefined') {
            creep.room.memory.cows = [];
        }
        var room_cows = creep.room.memory.cows;

        for(var name in room_cows) {
            if(!Game.creeps[name]) {
                delete room_cows[name];
            }
        }
        if(!creep.memory.grazing_spot) {
            // List all soures in the room
            var sources = creep.room.find(FIND_SOURCES);
            var slots = [];
            // Get all adjacent non-wall positions
            sources.forEach(function(source) {
                slots = slots.concat(source.pos.non_wall_adjacent());
            });
            // Remove any positions already in use by cows in this room
            /*
            room_cows.forEach(function(cow) {
            for(var name in room_cows) {
                _.pull(slots, cow.memory.grazing_spot);
            });
            */
            // Select one randomly from any left
            creep.memory.grazing_spot = _.sample(slots);
        }
        if(!creep.memory.grazing_spot) {
            creep.say("NOGRASS!");
            return;
        }
        var gs = memoryPosition(creep.memory.grazing_spot);
        if(!gs) {
            creep.say("???");
            return;
        }
        if(!gs.isEqualTo(creep.pos)) {
            creep.say("moving");
            creep.moveTo(gs);
            var flag_name = creep.name + "'s grazing spot"
            var flag = gs.createFlag(flag_name, COLOR_GREEN);
            if(flag == flag_name) {
                creep.memory.flag_id = Game.flags[flag_name].id;
            }
            return;
        } else {
            var flag = Game.getObjectById(creep.memory.flag_id);
            if(flag) {
                flag.remove();
                creep.memory.flag_id = undefined;
            }
        }
        if(!creep.memory.output_container_id) {
            // Then scan for a container to move stuff into
            var containers = creep.pos.findInRange(FIND_MY_STRUCTURES, 1,
                filter = function(structure) {
                    return structure.structureType == STRUCTURE_CONTAINER;
            });
            if(containers.length) {
                var container = containers[0];
                creep.memory.output_container_id = container.id;
            }
        }
        // If not present, then place the construction site and then
        // build it
        if(!creep.memory.output_container_id) {
            var sites = creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1,
                filter = function(site) {
                    return site.structureType == STRUCTURE_CONTAINER;
            });
            var site;
            if(sites.length) {
                site = sites[0];
            } else {
                var opposite_dir = gs.getDirectionTo(creep);
                var site_pos = creep.pos.step(opposite_dir);
                var rc = site_pos.createConstructionSite(STRUCTURE_CONTAINER);
                // It will be found next work tick.
                return;
            }
            creep.add_task({type: "construct", target: site.id, resupply:true});
            return;
        }
        creep.say("nom");

        // Then spend the rest of our lifespan harvesting and moving that
        // into the container, repairing the container first if needed.
    }
};

module.exports = roleCow;
