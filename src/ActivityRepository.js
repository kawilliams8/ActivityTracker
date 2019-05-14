class ActivityRepository {
	constructor(dataFilepath) {
		this.dataFilepath = dataFilepath;
	}

	returnActivity(userId) {
		return this.instantiateActivities().find(act => act.userActivityData.userID === userId);
	}

	instantiateActivities() {
		if (typeof module !== 'undefined') {
			return require(this.dataFilepath).map(user => new Activity(user));
		} else {
			return activityData.map(user => new Activity(user));
		}
	}

	returnAllAvgs(givenDate, property) {
		return Math.round(this.instantiateActivities().reduce((final, user) => {
			final += user.userActivityData.activityData.find(day => day.date === givenDate)[property];
			return final;
		}, 0) / (this.instantiateActivities().length));
	}

	// returnAllAvgs(givenDate, property) {
	// 	return Math.round(this.instantiateActivities().reduce((final, user) => {
	// 		const todayIndex = user.userActivityData.activityData.findIndex(el => el.date === givenDate);
	// 		const avgStairs = user.userActivityData.activityData.reduce((sum, el, index) => {
	// 			if (index <= todayIndex && index >= todayIndex - 6) {
	// 				sum += el[property];
	// 			}
	// 			return sum;
	// 		}, 0)
	// 		final += avgStairs;
	// 		return final;
	// 	}, 0) / (this.instantiateActivities().length));
	// }


}

if (typeof module !== 'undefined') {
	Activity = require('../src/Activity');
	module.exports = ActivityRepository;
}