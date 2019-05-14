const chai = require('chai');
const expect = chai.expect;

const ActivityRepository = require('../src/ActivityRepository')


describe('activityRepository', function() {

	it('Should be a function', function() {
		expect(ActivityRepository).to.be.a('function');
	});

	it('Should be an instance of the activityRepository class', function() {
		const activityRepo = new ActivityRepository('../data/proxy-activity');
		expect(activityRepo).to.be.an.instanceOf(ActivityRepository);
	});

	it('Should instantiate users with the given file path', function() {
		const activityRepo = new ActivityRepository('../data/proxy-activity');
		expect(activityRepo.instantiateActivities()[1].userActivityData.activityData[0].numSteps).to.eql(9101);
	});

	it('Should return user data object based on userId and data file', function() {
		const activityRepo = new ActivityRepository('../data/proxy-activity');
		expect(activityRepo.returnActivity(3).userActivityData.activityData[0].numSteps).to.eql(2420);
	});

	it('Should return the average stairs climbed for all users on a given date', function () {
		const activityRepo = new ActivityRepository('../data/proxy-activity');
		expect(activityRepo.returnAllAvgs("06/05/2019", 'flightsOfStairs')).to.eql(25);
	});

	it('Should return the average number of steps for all users on a given date', function () {
		const activityRepo = new ActivityRepository('../data/proxy-activity');
		expect(activityRepo.returnAllAvgs("06/05/2019", 'numSteps')).to.eql(14364);
	});

	it('Should return the average number minutes active for all users on a given date', function () {
		const activityRepo = new ActivityRepository('../data/proxy-activity');
		expect(activityRepo.returnAllAvgs("06/05/2019", 'minutesActive')).to.eql(283);
	});
}) 