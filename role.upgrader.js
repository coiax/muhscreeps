var roleUpgrader={name:"role.upgrader",run:function(b,a){if(0==a.carry.energy)return a.add_task({type:"resupply"}),{outcome:"continue"};a.upgradeController(a.room.controller)==ERR_NOT_IN_RANGE&&a.moveTo(a.room.controller);return{outcome:"continue"}}};module.exports=roleUpgrader;require("task_manager").register(roleUpgrader.name,roleUpgrader.run);
