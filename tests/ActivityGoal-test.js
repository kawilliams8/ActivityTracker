const chai = require('chai');
const expect = chai.expect;

const ActivityGoalsRepo = require('../src/ActivityGoalsRepo');
const ActivityGoal = require('../src/ActivityGoal')

describe('ActivityGoal', function() {

	it('Should be a function', function() {
		expect(ActivityGoal).to.be.a('function');
	});

	it('Should be an instance of the ActivityGoal class', function() {
		const activityGoal = new ActivityGoal();
		expect(activityGoal).to.be.an.instanceOf(ActivityGoal);
	});

	it('Should return whether the given user achieved their daily step goal for a given date', function() {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo.returnActivityGoal(3).returnStepGoalResult("07/05/2019")).to.eql(false);
	});

	it('Should return all days the given user achieved their daily step goal', function() {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo.returnActivityGoal(3).returnStepGoalSuccessDays().length).to.eql(3);
	});

	it('Should return all days the given user achieved their daily step goal', function() {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo.returnActivityGoal(3).returnStepGoalSuccessDays().length).to.eql(3);
	});

	it('Should return number of steps for a given day converted to miles', function() {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo.returnActivityGoal(3).returnStepsToMiles("11/05/2019")).to.eql(4.33);
	});

});