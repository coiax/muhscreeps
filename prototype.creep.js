var util=require("util");Creep.prototype.add_task=function(a){this.memory.task_queue||(this.memory.task_queue=[]);this.memory.task_queue.unshift(a)};Creep.prototype.pop_task=function(){this.memory.task_queue&&(this.memory.task_queue.shift(),0==this.memory.task_queue.length&&delete this.memory.task_queue)};Creep.prototype.has_task_in_queue=function(a){var b=[];this.memory.task_queue&&(b=this.memory.task_queue);for(var c in b){var d=b[c];if(a==d.type)return d}return null};
Creep.prototype.renew_cost=function(){return floor(600/this.body.length)};Creep.prototype.body_cost=function(){var a=[];this.body.forEach(function(b){a.push(b.type)});return util.body_cost(a)};Creep.prototype.body_part_count=function(a){var b=0;this.body.forEach(function(c){c.type==a&&b++});return b};Creep.prototype.maintain_cost=function(){return _.includes(this.body,CLAIM)?0:this.body_cost()/CREEP_LIFE_TIME};module.exports={};
