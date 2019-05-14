class Activity {
	constructor(userActivityData) {
		this.userActivityData = userActivityData;
	}

	returnAvgActiveWeek(givenDate, property) {
		const todayIndex = this.userActivityData.activityData.findIndex(day => day.date === givenDate);
		return Math.round(this.userActivityData.activityData.reduce((total, day, index) => {
			if (index <= todayIndex && index >= todayIndex - 6) {
				total += day[property];
			}
			return total
		}, 0) / 7);
	}

	returnStairRecord() {
		return this.userActivityData.activityData.reduce((total, day) => {
			const comparison = total < day.flightsOfStairs ? total = day.flightsOfStairs : total;
			return total;
		}, 0);
	}

	returnActiveDayProperty(givenDate, property) {
		return this.userActivityData.activityData.find(day => day.date === givenDate)[property];
	}
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}