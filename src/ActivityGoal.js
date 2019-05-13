class ActivityGoal {
	constructor(userDataset, activityDataset) {
		this.userDataset = userDataset;
		this.activityDataset = activityDataset;
	}

	returnStepGoalResult(givenDate) {
		const todaySteps = this.activityDataset.activityData.find(day => day.date === givenDate).numSteps;
		return todaySteps > this.userDataset.dailyStepGoal ? true : false;
	}

	returnStepGoalSuccessDays() {
		const stepGoal = this.userDataset.dailyStepGoal;
		return this.activityDataset.activityData.reduce((matchingDates, day) => {
			stepGoal < day.numSteps ? matchingDates.push(day.date) : matchingDates;
			return matchingDates;
		}, [])
	}

	returnStepsToMiles(givenDate) {
		const strideLength = this.userDataset.strideLength;
		const miles = strideLength * (this.activityDataset.activityData.find(day => day.date === givenDate).numSteps) / 5280;
		return Math.round(100 * miles) / 100;
	}
}

if (typeof module !== 'undefined') {
	module.exports = ActivityGoal;
}