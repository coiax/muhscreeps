var util=require("util");Creep.prototype.add_task=function(a){this.memory.task_queue||(this.memory.task_queue=[]);this.memory.task_queue.unshift(a)};Creep.prototype.log=function(a,b,c){this.memory.log||(this.memory.log=[]);a={level:a,message:c,tick:Game.time,subsystem:b};this.say(b+":"+c);this.memory.log.push(a)};Creep.prototype.warning=function(a,b){this.log("warning",a,b)};Creep.prototype.error=function(a,b){this.log("error",a,b)};
Creep.prototype.pop_task=function(){this.memory.task_queue&&(this.memory.task_queue.shift(),0==this.memory.task_queue.length&&(this.memory.task_queue=void 0))};Creep.prototype.has_task_in_queue=function(a){var b=this.memory.task_queue;if(!b)return null;for(var c in b){var d=b[c];if(a==d.type)return d}return null};Creep.prototype.has_tasks=function(){return this.memory.task_queue&&this.memory.task_queue.length?!0:!1};
Creep.prototype.wants_renew=function(){return 100>this.ticksToLive&&this.memory.autorenew&&!this.has_task_in_queue("renew")?!0:!1};Creep.prototype.renew_cost=function(){return floor(600/this.body.length)};Creep.prototype.body_cost=function(){var a=[];this.body.forEach(function(b){a.push(b.type)});return util.body_cost(a)};Creep.prototype.body_part_count=function(a,b){var c=0;this.body.forEach(function(b){b.type==a&&(!ignored_injured||100==b.hits)&&c++});return c};
Creep.prototype.maintain_cost=function(){return _.includes(this.body,CLAIM)?0:this.body_cost()/CREEP_LIFE_TIME};Creep.prototype.is_full=function(){return _.sum(this.carry)==this.carryCapacity};Creep.prototype.is_empty=function(){return 0==_.sum(this.carry)};Creep.prototype.find_support=function(){var a=this.pos.findClosestByPath(Game.spawns);a&&(this.deregister_support(),a.support_creep(this))};Creep.prototype.deregister_support=function(){var a=Game.spawns[this.memory.support];a&&a.unsupport_creep(this)};
module.exports={};
