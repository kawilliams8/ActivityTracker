const chai = require('chai');
const expect = chai.expect;

const ActivityGoalsRepo = require('../src/ActivityGoalsRepo');
const ActivityGoal = require('../src/ActivityGoal');

describe('ActivityGoalsRepo', function() {

	it('Should be a function', function() {
		expect(ActivityGoalsRepo).to.be.a('function');
	});

	it('Should be an instance of the ActivityGoalsRepo class', function() {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo).to.be.an.instanceOf(ActivityGoalsRepo);
	});

	it('Should be able to instantiate a new ActivityGoal with an id', function () {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo.returnActivityGoal(3).userDataset.dailyStepGoal).to.eql(4000);
		expect(activityGoalsRepo.returnActivityGoal(3).activityDataset.activityData[1].numSteps).to.eql(2280);
	});

	it('Should return the average miles walked for all users on a given date', function() {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo.returnGoalsAchieved("07/05/2019")).to.eql(1);
	})

});