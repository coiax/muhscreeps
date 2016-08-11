'use strict';var util = require("util");
Room.prototype.scout_room = function() {
  this.memory.intel = {};
  var a = this.memory.intel;
  a.time_scouted = Game.time;
  a.sources = {};
  this.find(FIND_SOURCES).forEach(function(b) {
    a.sources[b.id] = {pos:b.pos}
  });
  a.minerals = {};
  this.find(FIND_MINERALS).forEach(function(b) {
    a.minerals[b.id] = {pos:b.pos, type:b.mineralType, amount:b.mineralAmount, ticksToRegeneration:b.ticksToRegeneration}
  });
  this.controller ? (a.controller = {}, a.controller.level = this.controller.level, a.controller.owner = this.controller.owner, a.controller.reservation = this.controller.reservation, a.controller.id = this.controller.id, a.controller.pos = this.controller.pos) : a.controller = null;
  a.structures = {owned:{}, neutral:{}};
  this.find(FIND_STRUCTURES).forEach(function(b) {
    var c;
    b.owner ? (a.structures.owned[b.owner.username] || (a.structures.owned[b.owner.username] = {}), c = a.structures.owned[b.owner.username]) : c = a.structures.neutral;
    c[b.structureType] || (c[b.structureType] = 0);
    c[b.structureType]++
  });
  a.creeps = {};
  this.find(FIND_CREEPS).forEach(function(b) {
    var c = b.owner.username;
    a.creeps[c] || (a.creeps[c] = {bodyparts:{}, count:0});
    a.creeps[c].count++;
    var d = a.creeps[c].bodyparts;
    b.body.forEach(function(a) {
      a = a.type;
      d[a] || (d[a] = 0);
      d[a]++
    })
  })
};
module.exports = {};

