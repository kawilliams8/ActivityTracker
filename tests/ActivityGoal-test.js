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

	it('Should return all the friends total step count for a given week', function() {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo.returnActivityGoal(1).returnFriendStepCount('13/05/2019')[0].name).to.eql('Shayne Swift');
	})

	it('Should return the users total step count for a given week', function() {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo.returnActivityGoal(1).returnUserStepCount('13/05/2019').name).to.eql('Nyasia Weber');
	})

	it('Should return all friends step counts for the given week', function() {
		const activityGoalsRepo = new ActivityGoalsRepo('../data/proxy-users', '../data/proxy-activity');
		expect(activityGoalsRepo.returnActivityGoal(1).returnBestFriends('13/05/2019').length).to.eql(4);
	});

});