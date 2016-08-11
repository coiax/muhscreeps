'use strict';StructureTower.prototype.expected_power = function(d, b) {
  var a;
  switch(d) {
    case "attack":
      a = TOWER_POWER_ATTACK;
      break;
    case "heal":
      a = TOWER_POWER_HEAL;
      break;
    case "repair":
      a = TOWER_POWER_REPAIR;
      break;
    default:
      throw"Unrecognised action type";
  }
  var e = TOWER_FALLOFF_RANGE, c = TOWER_FALLOFF;
  return b <= TOWER_OPTIMAL_RANGE ? a : b >= e ? a * (1 - c) : a - (b - TOWER_OPTIMAL_RANGE) * (a * c / (TOWER_FALLOFF_RANGE - TOWER_OPTIMAL_RANGE))
};

