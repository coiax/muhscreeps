Structure.prototype.getMemory=function(){Memory.structures||(Memory.structures={});var a=Memory.structures[this.id];if(a)return a;Memory.structures[this.id]={};return Memory.structures[this.id]};Structure.prototype.add_task=function(a){var b=this.getMemory();b.task_queue||(b.task_queue=[]);b.task_queue.unshift(a)};Structure.prototype.pop_task=function(){this.getMemory().task_queue.shift()};
Structure.prototype.maintain_cost=function(){var a=0,b=0;switch(this.structureType){case STRUCTURE_CONTAINER:a=CONTAINER_DECAY;b=this.room.controller&&this.room.controller.owner?CONTAINER_DECAY_TIME_OWNED:CONTAINER_DECAY_TIME;break;case STRUCTURE_RAMPART:a=RAMPART_DECAY_AMOUNT;b=RAMPART_DECAY_TIME;break;case STRUCTURE_ROAD:a=ROAD_DECAY_AMOUNT,this.pos.is_swamp()&&(a*=CONSTRUCTION_COST_ROAD_SWAMP_RATIO),b=ROAD_DECAY_TIME}return 0==a||0==b?0:a/b*REPAIR_COST};
