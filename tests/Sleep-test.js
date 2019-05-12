const chai = require('chai');
const expect = chai.expect;

const SleepRepository = require('../src/SleepRepository')
const Sleep = require('../src/Sleep')

describe('Sleep', function() {

	it('Should be a function', function() {
		expect(Sleep).to.be.a('function');
	});

	it('Should be an instance of the Sleep class', function() {
		const sleep = new Sleep();
		expect(sleep).to.be.an.instanceOf(Sleep);
	});

	it('Should return how many hours a user slept on average per day', function() {
		const sleepRepo = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepo.returnSleep(2).returnAvgHours()).to.eql(7)
	});

	it('Should return a users all time average sleep quality', function() {
		const sleepRepo = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepo.returnSleep(3).returnAllTimeQuality()).to.eql(3)
	});

	it('Should return the user\'s hours of sleep on a given day', function() {
		const sleepRepo = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepo.returnSleep(1).sleepDay('08/05/2019')).to.eql(8.1);
	})

	it('Should return the user\'s sleep quality on a given day', function() {
		const sleepRepo = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepo.returnSleep(3).sleepQualityDay('06/05/2019')).to.eql(5);
	})

	it('Should return the total number of days with sleep quality over 4 for given user', function() {
		const sleepRepo = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepo.returnSleep(3).countBestQualities()).to.eql(5);
	})

	it('Should get sleep hours for seven days, including a given date', function() {
		const sleepRepo = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepo.returnSleep(3).returnSleepWeek("08/05/2019")).to.eql([4.7, 7.2, 5.4, 4.7, 7.2, 5.4, 4.7])
	})

});