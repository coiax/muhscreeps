var genericActions=require("genericActions"),roleUpgrader={name:"role.upgrader",run:function(a){0==a.carry.energy&&a.add_task({type:"resupply"});a.upgradeController(a.room.controller)==ERR_NOT_IN_RANGE&&a.moveTo(a.room.controller)}};module.exports=roleUpgrader;genericActions.register_task(roleUpgrader.name,roleUpgrader.run);
