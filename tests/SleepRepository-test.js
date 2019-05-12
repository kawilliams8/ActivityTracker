const chai = require('chai');
const expect = chai.expect;

const SleepRepository = require('../src/SleepRepository')


describe('SleepRepository', function() {

	it('Should be a function', function() {
		expect(SleepRepository).to.be.a('function');
	});

	it('Should be an instance of the SleepRepository class', function() {
		const sleepRepository = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepository).to.be.an.instanceOf(SleepRepository);
	});

	it('Should instantiate users with the given file path', function() {
		const sleepRepository = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepository.instantiateSleeps()[1].userSleepData.sleepData[0].sleepQuality).to.eql(2.2);
	})

	it('Should return user data object based on userId and data file', function() {
		const sleepRepository = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepository.returnSleep(3).userSleepData.sleepData[0].sleepQuality).to.eql(4.1);
	})

	it('Should calculate and return the average sleep quality for all users', function() {
		const sleepRepository = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepository.returnAvgSleepQuality()).to.equal(3);
	})

	it('Should find the users that slept the most on a given day ', function() {
		const sleepRepository = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepository.returnLongestSleepers('06/05/2019')).to.eql([3]);
	})

	it('Should return all user IDs for users that have an average sleep quality greater than 3, within a given week ', function () {
		const sleepRepository = new SleepRepository('../data/proxy-sleep');
		expect(sleepRepository.returnGreatSleepers("08/05/2019")).to.eql([2, 3])
	})
}) 