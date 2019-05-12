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

  countBestQualities() {
  	return this.userSleepData.sleepData.reduce((acc, curr) => {
  		const bestSleep = curr.sleepQuality >= 4 ? acc++ : acc;
  		return acc;
  	}, 0);
  }

  returnSleepWeek(givenDate) {
    const todayIndex = this.userSleepData.sleepData.findIndex(el => el.date === givenDate);
    return this.userSleepData.sleepData.reduce((acc, day, index) => {
      if (index <= todayIndex && index >= todayIndex - 6) {
        acc.push(day.hoursSlept);
      }
      return acc;
    }, [])
  }

  returnQualWeek(givenDate) {
  	const todayIndex = this.userSleepData.sleepData.findIndex(el => el.date === givenDate);
    return this.userSleepData.sleepData.reduce((acc, day, index) => {
      if (index <= todayIndex && index >= todayIndex - 6) {
        acc.push(day.sleepQuality);
      }
      return acc;
    }, [])
  }

}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}