class UserRepository {
	constructor(dataFilepath) {
		this.dataFilepath = dataFilepath;
	}

	returnUserData(userId) {
		return this.instantiateUsers().find(user => user.userData.id === userId);
	}

	calculateAvgStepGoal() {
		return Math.ceil(this.instantiateUsers().reduce((sum, num) => {
			return sum + num.userData.dailyStepGoal;
		}, 0) / this.instantiateUsers().length);
	}

	calculateModeState() {
		let stateCount = {};
		this.instantiateUsers().forEach(el => {
			const state = el.userData.address.split(' ')[el.userData.address.split(' ').length - 2]
			if (stateCount[state] > 0) {
				stateCount[state]++;
			} else {
				stateCount[state] = 1;
			}
		})
		
		return Object.keys(stateCount).find(el => stateCount[el] === Math.max(...Object.values(stateCount)));
	}

	instantiateUsers() {
		if (typeof module !== 'undefined') {
			return require(this.dataFilepath).map(user => new User(user));
		} else {
			return userData.map(user => new User(user));
		}
	}

}

if (typeof module !== 'undefined') {
	User = require('../src/User');
	module.exports = UserRepository;
}