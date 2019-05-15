const chai = require('chai');
const expect = chai.expect;

const Activity = require('../src/Activity')
const ActivityRepository = require('../src/ActivityRepository')

describe('Activity', function() {

	it('Should be a function', function() {
		expect(Activity).to.be.a('function');
	});

	it('Should be an instance of the Activity class', function() {
		const activity = new Activity();
		expect(activity).to.be.an.instanceOf(Activity);
	});

	it('Should calculate the average minutes active for a user in a week', function() {
		const activityRepo = new ActivityRepository('../data/proxy-activity');
		expect(activityRepo.returnActivity(3).returnAvgActiveWeek('14/05/2019', 'minutesActive', 7)).to.eql(134);
	});

	it('Should find a users alltime stair climbing record', function() {
		const activityRepo = new ActivityRepository('../data/proxy-activity');
		expect(activityRepo.returnActivity(3).returnStairRecord()).to.eql(36);
	});

	it('Should return the value of a given activity property for a given date', function() {
		const activityRepo = new ActivityRepository('../data/proxy-activity');
		expect(activityRepo.returnActivity(3).returnActiveDayProperty("10/05/2019", 'minutesActive')).to.eql(235);
	});

});