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
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}