class ActivityGoal {
	constructor(userDataset, activityDataset, friends) {
		this.userDataset = userDataset;
		this.activityDataset = activityDataset;
		this.friends = friends;
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

	returnUserStepCount(givenDate) {
		const todayIndex = this.activityDataset.activityData.findIndex(day => day.date === givenDate);
		const weekSteps = this.activityDataset.activityData.reduce((totalSteps, day, index) => {
			return index <= todayIndex && index >= todayIndex - 6 ? totalSteps += day.numSteps : totalSteps;
		}, 0);
		return {name: this.userDataset.name, totalSteps: weekSteps};
	}

	returnFriendStepCount(givenDate) {
		return this.friends.activities.reduce((totalArr, user) => {
		const todayIndex = user.activityData.findIndex(day => day.date === givenDate);
			const userSum = user.activityData.reduce((sum, day, index) => {
				return index <= todayIndex && index >= todayIndex - 6 ? sum += day.numSteps : sum;
			}, 0)
			totalArr.push({name: this.friends.users.find(userFriend => userFriend.id === user.userID).name, totalSteps: userSum})
			return totalArr;
		}, [])
	}

	returnBestFriend(givenDate) {
		const stepTotals = this.returnFriendStepCount(givenDate);
		stepTotals.push(this.returnUserStepCount(givenDate));
		return stepTotals.sort((a, b) => b.totalSteps - a.totalSteps)[0].name;
	}
}

if (typeof module !== 'undefined') {
	module.exports = ActivityGoal;
}