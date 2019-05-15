class HydrationRepository {
  constructor(dataFilepath) {
    this.dataFilepath = dataFilepath;
  }

  instantiateHydrations() {
    if (typeof module !== 'undefined') {
      return require(this.dataFilepath).map(el => new Hydration(el));
    } else {
      return hydrationData.map(el => new Hydration(el));
    }
  }

  returnHydrationUser(userId) {
    return this.instantiateHydrations().find(hyd => hyd.userHydrationData.userID === userId);
  }

  returnAvgHydrationRecord() {
    return Math.round(this.instantiateHydrations().reduce((totalHydration, user) => {
      const userSum = user.userHydrationData.hydrationData.reduce((sum, day) => {
        return sum += day.numOunces;
      }, 0) / user.userHydrationData.hydrationData.length;
      return totalHydration += userSum;
    }, 0) / this.instantiateHydrations().length);
  }

}

if (typeof module !== 'undefined') {
  Hydration = require('../src/Hydration');
  module.exports = HydrationRepository;
}