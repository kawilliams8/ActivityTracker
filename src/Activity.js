class Activity {
	constructor(userActivityData) {
		this.userActivityData = userActivityData;
	}

	returnAvgActiveWeek(givenDate) {
		const todayIndex = this.userActivityData.activityData.findIndex(day => day.date === givenDate);
		return Math.round(this.userActivityData.activityData.reduce((total, day, index) => {
			if (index <= todayIndex && index >= todayIndex - 6) {
				total += day.minutesActive;
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

	returnActiveMinutesDay(givenDate) {
		return this.userActivityData.activityData.find(day => day.date === givenDate).minutesActive;
	}
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}