class HydrationRepository {
  constructor(dataFilepath) {
    this.dataFilepath = dataFilepath;
  }

  instantiateUsers() {
    if (typeof module !== 'undefined') {
      return require(this.dataFilepath).map(el => new User(el));
    } else {
      return userData.map(el => new User(el));
    }
  }

  returnUserData(userId) {
    return this.instantiateUsers().find(user => user.userData.userID === userId);
  }

}

if (typeof module !== 'undefined') {
  User = require('../src/User');
  module.exports = HydrationRepository;
  }