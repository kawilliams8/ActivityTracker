class HydrationRepository {
  constructor(dataFilepath) {
    this.dataFilepath = dataFilepath;
  }

  instantiateHydrations() {
    if (typeof module !== 'undefined') {
      return require(this.dataFilepath).map(el => new Hydration(el));
    } else {
      return userData.map(el => new Hydration(el));
    }
  }

  returnHydrationUser(userId) {
    return this.instantiateHydrations().find(hyd => hyd.userHydrationData.userID === userId);
  }

}

if (typeof module !== 'undefined') {
  Hydration = require('../src/Hydration');
  module.exports = HydrationRepository;
}