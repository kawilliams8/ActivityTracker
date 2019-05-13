class ActivityGoalsRepo {
	constructor(usersFilepath, activityFilepath) {
		this.usersFilepath = usersFilepath;
		this.activityFilepath = activityFilepath;
	}

	returnActivityGoal(userId) {
		if (typeof module !== 'undefined') {
			const user = require(this.usersFilepath).find(el => el.id === userId);
			const activity = require(this.activityFilepath).find(el => el.userID === userId);
			return new ActivityGoal(user, activity);
		} else {
			const user = userData.find(el => el.userID === userId);
			const activity = activityData.find(el => el.userID === userId);
			return new ActivityGoal(user, activity);
		}
	}

	returnGoalsAchieved(givenDate) {
		if (typeof module !== 'undefined') {
			return require(this.activityFilepath).reduce((total, user, index) => {
				const steps = user.activityData.find(day => day.date === givenDate).numSteps;
				const stepGoal = require(this.usersFilepath)[index].dailyStepGoal;
				return steps > stepGoal ? total++ : total;
			}, 0);
		} else {
			return activityData.reduce((total, user, index) => {
				const steps = user.activityData.find(day => day.date === givenDate).numSteps;
				const stepGoal = userData[index].dailyStepGoal;
				return steps > stepGoal ? total++ : total;
			}, 0);
		}
	}
}

if (typeof module !== 'undefined') {
	ActivityGoal = require('../src/ActivityGoal');
	module.exports = ActivityGoalsRepo;
}