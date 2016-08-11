'use strict';var util = require("util");
RoomPosition.prototype.find = function() {
  var a = Game.rooms[this.roomName];
  return a ? a.find.apply(a, arguments) : function() {
    return[]
  }
};
RoomPosition.prototype.findStructures = function(a) {
  return a ? this.find(FIND_STRUCTURES, {filter:function(b) {
    return b.is_type(a)
  }}) : this.find(FIND_STRUCTURES)
};
RoomPosition.prototype.findDamagedStructures = function(a) {
  return _.filter(this.findStructures(a), util.is_damaged)
};
RoomPosition.prototype.findNeedingEnergyStructures = function(a) {
  return _.filter(this.findStructures(a), util.needs_energy)
};
RoomPosition.prototype.findDamagedFriendlyCreeps = function() {
  return this.find(FIND_MY_CREEPS, {filter:util.is_damaged})
};
RoomPosition.prototype.ordinals = function() {
  var a = this.x, b = this.y, c = this.roomName, a = [new RoomPosition(a + 1, b + 1, c), new RoomPosition(a + 0, b + 1, c), new RoomPosition(a - 1, b + 1, c), new RoomPosition(a + 1, b + 0, c), new RoomPosition(a - 1, b + 0, c), new RoomPosition(a + 1, b - 1, c), new RoomPosition(a + 0, b - 1, c), new RoomPosition(a - 1, b - 1, c)];
  return _.compact(a)
};
RoomPosition.prototype.cardinals = function() {
  var a = this.x, b = this.y, c = this.roomName, a = [new RoomPosition(a + 1, b + 0, c), new RoomPosition(a - 1, b + 0, c), new RoomPosition(a + 0, b + 1, c), new RoomPosition(a + 0, b - 1, c)];
  return _.compact(a)
};
RoomPosition.prototype.step = function(a) {
  var b = this.x, c = this.y, d = this.roomName;
  switch(a) {
    case TOP:
      c -= 1;
      break;
    case TOP_RIGHT:
      b += 1;
      c -= 1;
      break;
    case RIGHT:
      b += 1;
      break;
    case BOTTOM_RIGHT:
      b += 1;
      c += 1;
      break;
    case BOTTOM:
      c += 1;
      break;
    case BOTTOM_LEFT:
      b -= 1;
      c += 1;
      break;
    case LEFT:
      b -= 1;
      break;
    case TOP_LEFT:
      b -= 1, c -= 1
  }
  return new RoomPosition(b, c, d)
};
RoomPosition.prototype.is_terrain = function(a) {
  var b = this.lookFor(LOOK_TERRAIN), c;
  for(c in b) {
    var d = b[c];
    if("terrain" === d.type && d.terrain === a) {
      return!0
    }
  }
  return!1
};
RoomPosition.prototype.is_swamp = function() {
  return this.is_terrain("swamp")
};
RoomPosition.prototype.is_wall = function() {
  return this.is_terrain("wall")
};
RoomPosition.prototype.is_plain = function() {
  return this.is_terrain("plain")
};
RoomPosition.prototype.non_wall_adjacent = function() {
  return _.reject(this.ordinals(), function(a) {
    return a.is_wall()
  })
};
RoomPosition.prototype.walkable_adjacent = function() {
  return _.reject(this.ordinals(), function(a) {
    return a.has_obstacle()
  })
};
RoomPosition.prototype.has_obstacle = function() {
  var a = [];
  this.look().forEach(function(b) {
    switch(b.type) {
      case LOOK_TERRAIN:
        a.push(b.terrain);
        break;
      case LOOK_STRUCTURES:
        a.push(b.structure.structureType);
        break;
      case LOOK_CONSTRUCTION_SITES:
        a.push(b.constructionSite.structureType);
        break;
      case LOOK_SOURCES:
      ;
      case LOOK_CREEPS:
        a.push(b.type)
    }
  });
  return _.intersection(a, OBSTACLE_OBJECT_TYPES).length
};
module.exports = {};

