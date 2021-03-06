'use strict';module.exports = {};
var outcomes = {};
module.exports.outcomes = outcomes;
function Base() {
  this.increment = this.pop = !1;
  this.warning = this.error = this.push = null;
  this.next = this.stop = !1
}
outcomes.Base = Base;
function AlreadyComplete() {
  Base.call(this);
  this.pop = !0
}
AlreadyComplete.prototype = Object.create(Base.prototype);
AlreadyComplete.prototype.constructor = AlreadyComplete;
outcomes.AlreadyComplete = AlreadyComplete;
function InProgress() {
  Base.call(this);
  this.increment = 1;
  this.stop = !0
}
InProgress.prototype = Object.create(Base.prototype);
InProgress.prototype.constructor = InProgress;
outcomes.InProgress = InProgress;
function Complete() {
  Base.call(this);
  this.stop = this.pop = !0
}
Complete.prototype = Object.create(Base.prototype);
Complete.prototype.constructor = Complete;
outcomes.Complete = Complete;
function Failure(a) {
  Base.call(this);
  this.pop = !0;
  this.warning = a
}
Failure.prototype = Object.create(Base.prototype);
Failure.prototype.constructor = Failure;
outcomes.Failure = Failure;
function PushTask(a) {
  Base.call(this);
  this.increment = 1;
  this.push = a
}
PushTask.prototype = Object.create(Base.prototype);
PushTask.prototype.constructor = PushTask;
outcomes.PushTask = PushTask;
function ReplaceTask(a) {
  Base.call(this);
  this.pop = !0;
  this.push = a
}
ReplaceTask.prototype = Object.create(Base.prototype);
ReplaceTask.prototype.constructor = ReplaceTask;
outcomes.ReplaceTask = ReplaceTask;
function TaskError(a) {
  Base.call(this);
  this.stop = this.pop = !0;
  this.error = a
}
TaskError.prototype = Object.create(Base.prototype);
TaskError.prototype.constructor = TaskError;
outcomes.TaskError = TaskError;
function Rerun() {
  Base.call(this);
  this.increment = 1
}
Rerun.prototype = Object.create(Base.prototype);
Rerun.prototype.constructor = Rerun;
outcomes.Rerun = Rerun;
function NextTask() {
  Base.call(this);
  this.next = !0;
  this.increment = 1
}
NextTask.prototype = Object.create(Base.prototype);
NextTask.prototype.constructor = NextTask;
outcomes.NextTask = NextTask;

