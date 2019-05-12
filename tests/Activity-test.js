const chai = require('chai');
const expect = chai.expect;

const Activity = require('../src/Activity')

describe('activity', function() {

	it('Should be a function', function() {
		expect(Activity).to.be.a('function');
	});

	it('Should be an instance of the Activity class', function() {
		const activity = new Activity();
		expect(activity).to.be.an.instanceOf(Activity);
	});
});