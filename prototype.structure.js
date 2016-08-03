Structure.prototype.getMemory=function(){if(this.structureType==STRUCTURE_SPAWN)return Memory.spawns||(Memory.spawns={}),Memory.spawns[this.name]||(Memory.spawns[this.name]={}),Memory.spawns[this.name];Memory.structures||(Memory.structures={});var a=Memory.structures[this.id];if(a)return a;Memory.structures[this.id]={};return Memory.structures[this.id]};Structure.prototype.add_task=function(a){var b=this.getMemory();b.task_queue||(b.task_queue=[]);b.task_queue.unshift(a)};
Structure.prototype.pop_task=function(){var a=this.getMemory();a.task_queue&&(a.task_queue.shift(),0==a.task_queue.length&&delete a.task_queue)};Structure.prototype.log=function(a,b,c){this.memory.log||(this.memory.log=[]);this.memory.log.push({level:a,message:c,tick:Game.time,subsystem:b})};Structure.prototype.warning=function(a,b){this.log("warning",a,b)};Structure.prototype.error=function(a,b){this.log("error",a,b)};
Structure.prototype.maintain_cost=function(){var a=0,b=0;switch(this.structureType){case STRUCTURE_CONTAINER:a=CONTAINER_DECAY;b=this.room.controller&&this.room.controller.owner?CONTAINER_DECAY_TIME_OWNED:CONTAINER_DECAY_TIME;break;case STRUCTURE_RAMPART:a=RAMPART_DECAY_AMOUNT;b=RAMPART_DECAY_TIME;break;case STRUCTURE_ROAD:a=ROAD_DECAY_AMOUNT,this.pos.is_swamp()&&(a*=CONSTRUCTION_COST_ROAD_SWAMP_RATIO),b=ROAD_DECAY_TIME}return 0==a||0==b?0:a/b*REPAIR_COST};
Structure.prototype.is_type=function(a){a.constructor!=Array&&(a=[a]);return _.includes(a,this.structureType)};Structure.prototype.is_full=function(){return!this.isActive()?null:this.store?_.sum(this.store)==this.storeCapacity:"undefined"==typeof this.energy||"undefined"==typeof this.energyCapacity?null:this.energy==this.energyCapacity};
