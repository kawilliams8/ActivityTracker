class SleepRepository {
	constructor(dataFilepath) {
		this.dataFilepath = dataFilepath;
	}

	returnSleep(userId) {
		return this.instantiateSleeps().find(slp => slp.userSleepData.userID === userId);
	}

	instantiateSleeps() {
		if (typeof module !== 'undefined') {
			return require(this.dataFilepath).map(user => new Sleep(user));
		} else {
			return sleepData.map(user => new Sleep(user));
		}
	}

	returnAvgSleepQuality() {
		const qualities = [];		
		this.instantiateUsers().forEach(el => el.userData.sleepData.forEach(el => qualities.push(el.sleepQuality)));
		return Math.round((10 * qualities.reduce((sum, num) => sum + num)) / qualities.length) / 10;
	}

	returnGreatSleepers() {
		//
	}

	returnLongestSleepers(givenDate) {
		// const longSleepers = [];
		// this.instantiateUsers().forEach(el => longSleepers.push(el.userData.sleepData.find(el => el.date === givenDate)));
		// return longSleepers.find(el => el.hoursSlept === Math.max(el.hoursSlept));
	}

}

if (typeof module !== 'undefined') {
	Sleep = require('../src/Sleep');
	module.exports = SleepRepository;
}