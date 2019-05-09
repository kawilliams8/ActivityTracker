$(document).ready(function() {
  const userRepo = new UserRepository();
  const hydroRepo = new HydrationRepository();
	populateUserName();
	populateUserCard();
	displayStepGoalMessage();
	populateTodayHydration();
	populateHydrationCard();

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
})
