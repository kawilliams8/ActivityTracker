const chai = require('chai');
const expect = chai.expect;

const HydrationRepository = require('../src/HydrationRepository')


describe('HydrationRepository', function () {

  it('Should be a function', function () {
    expect(HydrationRepository).to.be.a('function');
  });

  it('Should be an instance of the HydrationRepository class', function () {
    const hydrationRepository = new HydrationRepository('../data/proxy-hydration');
    expect(hydrationRepository).to.be.an.instanceOf(HydrationRepository);
  });

  it('Should instantiate users\' hydration data objects with the given file path', function () {
    const hydrationRepository = new HydrationRepository('../data/proxy-hydration');
    expect(hydrationRepository.instantiateHydrations()[0].userHydrationData.hydrationData[0].numOunces).to.eql(64);
  })

  it('Should return user data object based on userId and data file', function () {
    const hydrationRepository = new HydrationRepository('../data/proxy-hydration');
    expect(hydrationRepository.returnHydrationUser(1).userHydrationData.hydrationData[1].numOunces).to.eql(80);
  })

})