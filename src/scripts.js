const $main = $('main')
const $section = $('section');
const $h2FirstName = $('.h2--first-name');
const $ul = $('ul');
const $li = $('li');
const $listSpans = $('li span');
const $liName = $('.li--name');
const $liAddress = $('.li--address');
const $liEmail = $('.li--email');
const $liStrideLength = $('.li--stride-length');
const $liDailyStepGoal = $('.li--daily-step-goal');
const $stepGoalMessage = $('.step-goal-message');


$(document).ready(function() {
	const userRepo = new UserRepository();
	populateUserName();
	populateCardInfo();
	displayStepGoalMessage();

	function populateUserName() {
		$h2FirstName.text(userRepo.returnUserData(3).returnFirstName() + '!');
	}

	function populateCardInfo() {
		const spans = $.makeArray($listSpans)
		const userInfo = Object.values(userRepo.returnUserData(3).userData)
		for (let i = 1; i < userInfo.length; i++) {
			$(spans[i - 1]).text(userInfo[i]);
		}
	}

	function displayStepGoalMessage() {
		const avgSteps = userRepo.calculateAvgStepGoal();
		const userSteps = userRepo.returnUserData(3).userData.dailyStepGoal;
		$stepGoalMessage.text(`The average Activity Tracker user set a goal of ${avgSteps} steps per day. Your goal of ${userSteps} is ${userSteps > avgSteps ? 'above' : 'below'} average.`);
	}



})
