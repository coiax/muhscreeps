RoomPosition.prototype.ordinals = function() {
    var out = [
        RoomPosition(x + 1, y + 1, roomName),
        RoomPosition(x + 0, y + 1, roomName),
        RoomPosition(x - 1, y + 1, roomName),
        RoomPosition(x + 1, y + 0, roomName),
        //RoomPosition(x + 0, y + 0, roomName),
        RoomPosition(x - 1, y + 0, roomName),
        RoomPosition(x + 1, y - 1, roomName),
        RoomPosition(x + 0, y - 1, roomName),
        RoomPosition(x - 1, y - 1, roomName)
    ];
    return _.compact(out);
};

RoomPosition.prototype.cardinals = function() {
    var out = [
        RoomPosition(x + 1, y + 0, roomName),
        RoomPosition(x - 1, y + 0, roomName),
        RoomPosition(x + 0, y + 1, roomName),
        RoomPosition(x + 0, y - 1, roomName)
    ];
    return _.compact(out);
};

RoomPosition.prototype.is_terrain = function(terrain_type) {
    var contains = look();
    for(var o in contains) {
        if((o.type == 'terrain') && (o.terrain == terrain_type)) {
            return true;
        }
    }
    return false;
};

RoomPosition.prototype.is_swamp = function () {
    return is_terrain('swamp');
};

RoomPosition.prototype.is_wall = function () {
    return is_terrain('wall');
};

RoomPosition.prototype.is_plain = function () {
    return is_terrain('plain');
};

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
            for(var source in sources) {
                slots.concat(_.reject(source.ordinals,
                    function(mp) {return mp.is_wall();})
                );
            }
            // Remove any positions already in use by cows in this room
            for(var name in room_cows) {
                var other_cow = Game.creeps[name];
                _.pull(slots, other_cow.memory.grazing_spot);
            }
            // Select one randomly from any left
            creep.memory.grazing_spot = _.sample(slots);
        }
        if(!creep.memory.grazing_spot) {
            creep.say("NOGRASS!");
            return;
        }
        var gs = creep.memory.grazing_spot;
        if(!gs.isEqualTo(creep.pos)) {
            creep.moveTo(creep.memory.grazing_spot);
            gs.createFlag(creep.name + "'s grazing spot");
            return;
        }
        creep.say("nom");
        // Then scan for a container to move stuff into
        // If not present, then place the construction site and then
        // build it
        // Then spend the rest of our lifespan harvesting and moving that
        // into the container, repairing the container first if needed.
    }
};

module.exports = roleCow;
