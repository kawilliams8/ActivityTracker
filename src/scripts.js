$(document).ready(function() {
  const userRepo = new UserRepository();
  const hydroRepo = new HydrationRepository();
  const sleepRepo = new SleepRepository();
	populateUserName();
	populateUserCard();
	displayStepGoalMessage();
	populateTodayHydration();
	populateHydrationCard();
	populateSleepCard();

	function populateUserName() {
		$('.h2--first-name').text(userRepo.returnUserData(3).returnFirstName() + '!');
	}

	function populateUserCard() {
		const spans = $.makeArray($('.li--user span'));
		const userInfo = Object.values(userRepo.returnUserData(3).userData);
		for (let i = 1; i < userInfo.length; i++) {
			$(spans[i - 1]).text(userInfo[i]);
		}
	}

	function displayStepGoalMessage() {
		const avgSteps = userRepo.calculateAvgStepGoal();
		const userSteps = userRepo.returnUserData(3).userData.dailyStepGoal;
		$('.step-goal-message').text(`The average Activity Tracker user set a goal of ${avgSteps} steps per day. Your goal of ${userSteps} is ${userSteps > avgSteps ? 'above' : 'below'} average.`);
	}

	function populateHydrationCard() {
		const spans = $.makeArray($('.li--hydro span'));
		const userInfo = Object.values(hydroRepo.returnHydrationUser(3).hydrationSevenDay('21/05/2019'));
		for (let i = 0; i < userInfo.length; i++) {
			$(spans[i]).text(userInfo[i]);
		}
	}

	function populateTodayHydration() {
		$('.h4--hydration').text(hydroRepo.returnHydrationUser(3).hydrationDay('21/05/2019'));
	}

	function populateSleepCard() {
		populateTodaySleep("13/08/2019");
		populateSleepMessage('.p--sleep-quality');
		populateSleepMessage('.p--sleep-hours');
		populateBestSleepCount();
		populateSleepWeek();
	}

	function populateSleepMessage(span) {
		return span == '.p--sleep-quality' ? $(span).text(sleepRepo.returnSleep(3).returnAllTimeQuality()) : $(span).text(sleepRepo.returnSleep(3).returnAvgHours());
	}

	function populateTodaySleep(givenDate) {
		$('.h4--sleep-hours').text(sleepRepo.returnSleep(3).sleepDay(givenDate));
		$('.h4--sleep-quality').text(sleepRepo.returnSleep(3).sleepQualityDay(givenDate));
	}

	function populateBestSleepCount() {
		$('.p--sleep-best').text(sleepRepo.returnSleep(3).countBestQualities());
	}

	function populateSleepWeek() {
		const spanHours = $.makeArray($('.li--span-hours'));
		const spanQuals = $.makeArray($('.li--span-quality'));
		const hoursInfo = Object.values(sleepRepo.returnSleep(3).returnSleepWeek('21/05/2019'));
		const qualInfo = Object.values(sleepRepo.returnSleep(3).returnQualWeek('21/05/2019'));
		for (let i = 0; i < hoursInfo.length; i++) {
			$(spanHours[i]).text(hoursInfo[i]);
			$(spanQuals[i]).text(qualInfo[i]);
		}
	}
})
