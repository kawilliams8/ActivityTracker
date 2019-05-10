class Sleep {
	constructor(userSleepData) {
		this.userSleepData = userSleepData;
	}

	returnAvgHours() {
		return Math.round(this.userSleepData.sleepData.reduce((total, day, index, array) => {
			total += day.hoursSlept;
			return index === array.length - 1 ? total / array.length : total;
  	}, 0));
	}

	returnAllTimeQuality() {
		return Math.round(this.userSleepData.sleepData.reduce((total, day, index, array) => {
			total += day.sleepQuality;
			return index === array.length - 1 ? total / array.length : total;
  	}, 0));
  }
  
  sleepDay(givenDate) {
    return this.userSleepData.sleepData.find(el => el.date === givenDate).hoursSlept;
  }

  sleepQualityDay(givenDate) {
    return this.userSleepData.sleepData.find(el => el.date === givenDate).sleepQuality;
  }

}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}