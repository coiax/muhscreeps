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
            return
        }
        if(!gs.isEqualTo(creep.pos)) {
            creep.say("moving");
            creep.moveTo(gs);
            gs.createFlag(creep.name + "'s grazing spot", COLOR_GREEN);
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
