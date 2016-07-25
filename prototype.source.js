Source.prototype.is_harvestable=function(a){return 0==this.energy?!1:a&&this.pos.isNearTo(a)?!0:this.pos.walkable_adjacent().length?!0:!1};
