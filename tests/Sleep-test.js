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

});