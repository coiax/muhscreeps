Structure.prototype.maintain_cost=function(){var a=0,b=0;switch(this.structureType){case STRUCTURE_CONTAINER:a=CONTAINER_DECAY;b=this.room.controller&&this.room.controller.owner?CONTAINER_DECAY_TIME_OWNED:CONTAINER_DECAY_TIME;break;case STRUCTURE_RAMPART:a=RAMPART_DECAY_AMOUNT;b=RAMPART_DECAY_TIME;break;case STRUCTURE_ROAD:a=ROAD_DECAY_AMOUNT,this.pos.is_swamp()&&(a*=CONSTRUCTION_COST_ROAD_SWAMP_RATIO),b=ROAD_DECAY_TIME}return 0==a||0==b?0:a/b*REPAIR_COST};
Creep.prototype.maintain_cost=function(){return _.includes(this.body,CLAIM)?0:this.body_cost()/CREEP_LIFE_TIME};module.exports={};
