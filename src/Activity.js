class Activity {
	constructor(userActivityData) {
		this.userActivityData = userActivityData;
	}

	returnAvgActiveWeek(givenDate, property, days) {
		const todayIndex = this.userActivityData.activityData.findIndex(day => day.date === givenDate);
		return Math.round(this.userActivityData.activityData.reduce((total, day, index) => {
			if (index <= todayIndex && index >= todayIndex - 6) {
				total += day[property];
			}
			return total
		}, 0) / days);
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

	returnStepStreaks() {
		let streak = [];
		return this.userActivityData.activityData.reduce((streaks, day, index, array) => {
			if (streak.length === 0) {
				streak.push(day);
			} else if (index > 0 && day.numSteps > array[index -1].numSteps) {
				streak.push(day);
			} else if (index > 0 && day.numSteps <= array[index -1].numSteps && streak.length > 2) {
				streaks.push(streak);
				streak = [];
			} else {
				streak = [];
			}
			return streaks;
		}, []);
	}
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}