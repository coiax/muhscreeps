var util=require("util");function setup(){Memory.cpu||(Memory.cpu={});Memory.cpu.values_kept||(Memory.cpu.values_kept=1E3);Memory.cpu.roles||(Memory.cpu.roles={});Memory.cpu.tasks||(Memory.cpu.tasks={});Memory.cpu.main||(Memory.cpu.main={})}function add_value(a,b){a.push(b);a.length>Memory.cpu.values_kept&&a.splice(0,a.length-Memory.cpu.values_kept)}function calculate_average(a){var b=0;return a?(a.forEach(function(a){b+=a.used}),b/a.length):0}
function record(a,b){var c=Game.time;a.values||(a.values=[]);add_value(a.values,{time:c,used:b});c=_.map(a.values,_.property("used"));a.last=b;a.avg=util.mean(c);a.sd=util.standard_deviation(c)}module.exports={record_main:function(){setup();record(Memory.cpu.main,Game.cpu.getUsed())},record_task:function(a,b){setup();Memory.cpu.tasks[a]||(Memory.cpu.tasks[a]={});record(Memory.cpu.tasks[a],b)}};
