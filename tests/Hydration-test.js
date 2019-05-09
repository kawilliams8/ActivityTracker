const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration')

describe('Hydration', function() {

	it('Should be a function', function() {
		expect(Hydration).to.be.a('function');
	});

	it('Should be an instance of the Hydration class', function() {
		const hydration = new Hydration();
		expect(hydration).to.be.an.instanceOf(Hydration);
	});

	it('Should return the user\'s average fluid ounces drank (over all their documented days)', function() {
		const hydration = new Hydration();
		expect(hydration.returnUserAvgOz(3)).to.eql(43);
	})

	it.skip('Should return the exact fluid ounces drank on a given day', function() {
		const hydration = new Hydration();
		expect(hydration).to.eql();
	})

	it.skip('Should return the fluid ounces drank on each day, during a given week', function() {
		const hydration = new Hydration();
		expect(hydration).to.eql();
	})
})