class Hydration {
  constructor(userHydrationData) {
    this.userHydrationData = userHydrationData;
  }

  returnUserAvgOz() {
  	return Math.round(this.userHydrationData.hydrationData.reduce((total, oz, index, array) => {
  		total += oz.numOunces;
  		return index === array.length - 1 ? total / array.length : total;
  	}, 0));
  }

  hydrationDay(givenDate) {
  	return this.userHydrationData.hydrationData.find(el => el.date === givenDate).numOunces;
  }

  hydrationSevenDay(givenDate) {
  	const dayObj = {};
  	const day = this.userHydrationData.hydrationData.findIndex(el => el.date === givenDate);
  	for (let i = day; i > day - 7; i--) {
  		dayObj[this.userHydrationData.hydrationData[i].date] = this.userHydrationData.hydrationData[i].numOunces;
  	}
  	return dayObj;
  }

  returnHydrationRecord() {
    return this.userHydrationData.hydrationData.reduce((record, day) => {
      day.numOunces > record ? record = day.numOunces : record;
      return record;
    }, 0)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}