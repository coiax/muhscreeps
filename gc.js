'use strict';module.exports = {gc:function() {
  [{collection:Memory.structures, comparison:Game.structures}, {collection:Memory.creeps, comparison:Game.creeps}, {collection:Memory.spawns, comparison:Game.spawns}].forEach(function(a) {
    var b = a.collection;
    a = a.comparison;
    if(b && a) {
      for(var c in b) {
        (!a[c] || !b[c] || _.isEmpty(b[c])) && delete b[c]
      }
    }
  })
}};

