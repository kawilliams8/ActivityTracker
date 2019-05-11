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
		this.instantiateSleeps().forEach(el => el.userSleepData.sleepData.forEach(el => qualities.push(el.sleepQuality)));
		return Math.round((10 * qualities.reduce((sum, num) => sum + num)) / qualities.length) / 10;
	}

	returnGreatSleepers() {
		//
	}

	returnLongestSleepers(givenDate) {
		const data = [
  {
    "userID": 1,
    "sleepData": [
      {
        "date": "06/05/2019",
        "hoursSlept": 8,
        "sleepQuality": 4.8
      },
      {
        "date": "07/05/2019",
        "hoursSlept": 10.7,
        "sleepQuality": 4.8
      },
      {
        "date": "08/05/2019",
        "hoursSlept": 8.1,
        "sleepQuality": 1.9
      }]
  },
  {
    "userID": 2,
    "sleepData": [
      {
        "date": "06/05/2019",
        "hoursSlept": 6.3,
        "sleepQuality": 2.2
      },
      {
        "date": "07/05/2019",
        "hoursSlept": 9.2,
        "sleepQuality": 4.8
      },
      {
        "date": "08/05/2019",
        "hoursSlept": 6.6,
        "sleepQuality": 4.5
      }]
  },
  {
    "userID": 3,
    "sleepData": [
      {
        "date": "06/05/2019",
        "hoursSlept": 7.2,
        "sleepQuality": 5
      },
      {
        "date": "07/05/2019",
        "hoursSlept": 5.4,
        "sleepQuality": 4.1
      },
      {
        "date": "08/05/2019",
        "hoursSlept": 4.7,
        "sleepQuality": 1.2
      }]
  },
  {
    "userID": 4,
    "sleepData": [
      {
        "date": "06/05/2019",
        "hoursSlept": 8,
        "sleepQuality": 4.8
      },
      {
        "date": "07/05/2019",
        "hoursSlept": 10.7,
        "sleepQuality": 4.8
      },
      {
        "date": "08/05/2019",
        "hoursSlept": 8.1,
        "sleepQuality": 1.9
      }]
  }
]	
		const reduced = data.reduce((acc, user) => {
			const matchingDate = user.sleepData.filter(date => date.date === givenDate);
			acc.push({id: user.userID, ...matchingDate })
			return acc;
		}, [])

		reduced.sort((a, b) => b['0'].hoursSlept - a['0'].hoursSlept);
		const result = reduced.filter(item => item['0'].hoursSlept === reduced[0]['0'].hoursSlept)
		console.log(result.map(item => item.id));
	}



}

if (typeof module !== 'undefined') {
	Sleep = require('../src/Sleep');
	module.exports = SleepRepository;
}