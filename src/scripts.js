$(document).ready(function() {
  const userRepo = new UserRepository();
  const hydroRepo = new HydrationRepository();
	const sleepRepo = new SleepRepository();
	const activityRepo = new ActivityRepository();
	const activityGoalsRepo = new ActivityGoalsRepo();
	populateUserCard();
	populateHydrationCard();
	populateSleepCard();
	populateActivityCard();

	$('ul.tabs li').on('click', openPage);

	function openPage() {
		let tab_id = $(this).attr('data-tab');	
		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');
		$(this).addClass('current');
		$('#' + tab_id).addClass('current'); 
	}

	setInterval(function() { hydrationRecordPolar.update();}, 1000);


	function populateUserCard() {
		populateUserName();
		populateUserInfo();
		displayStepGoalMessage();
	}

	function populateUserName() {
		$('.h2--first-name').text(userRepo.returnUserData(3).returnFirstName() + '!');
	}

	function populateUserInfo() {
		const spans = $.makeArray($('.li--user span'));
		const userInfo = Object.values(userRepo.returnUserData(3).userData);
		for (let i = 1; i < userInfo.length; i++) {
			$(spans[i - 1]).text(userInfo[i]);
		}
	}

	function displayStepGoalMessage() {
		const avgSteps = userRepo.calculateAvgStepGoal();
		const userSteps = userRepo.returnUserData(3).userData.dailyStepGoal;
		$('.step-goal-message').html(`The average Activity Tracker user set a goal of <span class="step-message-span">${avgSteps}</span> steps per day. Your goal of <span class="step-message-span">${userSteps}</span> is ${userSteps > avgSteps ? 'above' : 'below'} average.`);
	}

	function populateHydrationCard() {
		populateTodayHydration();
	}

	function populateTodayHydration() {
		$('.h4--hydration').text(hydroRepo.returnHydrationUser(3).hydrationDay('21/05/2019'));
	}

	function populateSleepCard() {
		populateTodaySleep('21/05/2019');
		populateSleepMessage('.p--sleep-quality');
		populateSleepMessage('.p--sleep-hours');
		populateBestSleepCount();
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

	function populateActivityCard() {
		populateActivityTitles(".h4--activity-steps", '21/05/2019', 'numSteps');
		populateActivityTitles(".h4--activity-minutes",'21/05/2019', 'minutesActive');
		populateMilesTitle('21/05/2019');
		populateStreakCount();
		populateFriendBoard();
	}

	function populateFriendBoard() {
		const nameSpans = $.makeArray($('.friend-name'));
		const stepSpans = $.makeArray($('.friend-steps'));
		activityGoalsRepo.returnActivityGoal(3).returnBestFriends('21/05/2019').forEach((friend, index) => {
			nameSpans[index].innerText = `${friend.name}, Steps: `;
			stepSpans[index].innerText = friend.totalSteps;
		})
	}

	function populateStreakCount() {
		$('.step-streak-count').text(activityRepo.returnActivity(3).returnStepStreaks());
	}

	function populateActivityTitles(selector, givenDate, property) {
	$(selector).text(activityRepo.returnActivity(3).returnActiveDayProperty(givenDate, property));
}

	function populateMilesTitle(givenDate) {
		$(".h4--activity-miles").text(activityGoalsRepo.returnActivityGoal(3).returnStepsToMiles(givenDate));
	}

	const stepGoalBar = new Chart($('#chart--stepgoal-bar'), {
		type: 'bar',
		data: {
			labels: ['Your Daily Goal', 'Average User Goal'],
			datasets: [{
				label: 'Daily Step Goal',
				data: [userRepo.returnUserData(3).userData.dailyStepGoal, userRepo.calculateAvgStepGoal()],
				backgroundColor: [
					'#45A29E',
					'#45A29E'
				],
			}]
		},
		options: {
			defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Fira Sans'",
			responsive: false,
			maintainAspectRatio: true,
			aspectRatio: 2,
			scales: {
				yAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	})

	const weeklyWaterBar = new Chart($('#chart--weeklywater-bar'), {
		type: 'bar',
		data: {
			labels: ['Today', 'Yesterday', '2 Days', '3 Days', '4 Days', '5 Days', '6 Days'],
			datasets: [{
				label: 'Weekly Hydration',
				data: Object.values(hydroRepo.returnHydrationUser(3).hydrationSevenDay('21/05/2019')),
				backgroundColor: [
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)'
				]
			}]
		},
		options: {
			defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Fira Sans'",
			responsive: false,
			maintainAspectRatio: true,
			aspectRatio: 2,
			scales: {
				yAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	})

	const hydrationRecordPolar = new Chart($('#chart--all-time-water-polar'), {
		type: 'polarArea',
		data: {
			labels: ['Your record', 'Today\'s Hydration', 'Avg User Record'],
			datasets: [{
				data: [hydroRepo.returnHydrationUser(3).returnHydrationRecord(), hydroRepo.returnHydrationUser(3).hydrationDay('21/05/2019'), hydroRepo.returnAvgHydrationRecord()],
				backgroundColor: [
					'rgba(11, 204, 207, .3)',
					'rgba(207, 15, 11, .5)',
					'rgba(207, 100, 11, .7)'
				]
			}],
  		options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js'
        },
        scales: {
            xAxes: [{
                display: true
            }],
            yAxes: [{
                display: true
            }]
        }
    	}
		}
	})

	const weeklySleepRadar = new Chart($('#chart--weeklysleep-radar'), {
		type: 'radar',
		data: {
			labels: ['Today', 'Yesterday', '2 Days', '3 Days', '4 Days', '5 Days', '6 Days'],
			datasets: [{
				label: 'Sleep Hours',
				data: Object.values(sleepRepo.returnSleep(3).returnSleepWeek('21/05/2019')),
				backgroundColor: [
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)',
					'rgba(11, 204, 207, .3)'
				]
			},
			{
				label: 'Sleep Quality',
				data: Object.values(sleepRepo.returnSleep(3).returnQualWeek('21/05/2019')),
				backgroundColor: [
					'rgba(207, 15, 11, .3)',
					'rgba(207, 15, 11, .3)',
					'rgba(207, 15, 11, .3)',
					'rgba(207, 15, 11, .3)',
					'rgba(207, 15, 11, .3)',
					'rgba(207, 15, 11, .3)',
					'rgba(207, 15, 11, .3)'
				]
			}]
		},
		options: {
			defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Fira Sans'",
			responsive: false,
			maintainAspectRatio: true,
			aspectRatio: 2,
			scales: {
				yAxes: [{
					gridLines: {
						drawBorder: false,
						display: false
					},
					ticks: {

						beginAtZero: true
					}
				}]
			}
		}
	})

	const weeklyActivityHorBar1 = new Chart($('#chart--weeklyactivity-horbar1'), {
		type: 'horizontalBar',
		data: {
			labels: ['Steps'],
			datasets: [{
				label: 'You',
				data: [activityRepo.returnActivity(3).returnActiveDayProperty('21/05/2019', 'numSteps')],
				backgroundColor: [
					'rgba(11, 204, 207, .3)',
				]
			},
			{
				label: 'Avg User',
				data: [activityRepo.returnAllAvgs('21/05/2019', 'numSteps')],
				backgroundColor: [
					'rgba(207, 15, 11, .3)',
				]
			}]
		},
		options: {
			defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Fira Sans'",
			responsive: false,
			maintainAspectRatio: true,
			aspectRatio: 2,
			scales: {
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						beginAtZero: true
					}
				}],
				yAxes: [{
					barThickness: 50
				}]
			}
		}
	})

	const weeklyActivityHorBar2 = new Chart($('#chart--weeklyactivity-horbar2'), {
		type: 'horizontalBar',
		data: {
			labels: [' Minutes'],
			datasets: [{
				label: 'You',
				data: [activityRepo.returnActivity(3).returnActiveDayProperty('21/05/2019', 'minutesActive'),],
				backgroundColor: [
					'rgba(11, 204, 207, .3)'
				]
			},
			{
				label: 'Avg User',
				data: [activityRepo.returnAllAvgs('21/05/2019', 'minutesActive')],
				backgroundColor: [
					'rgba(207, 15, 11, .3)'
				]
			}]
		},
		options: {
			defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Fira Sans'",
			responsive: false,
			maintainAspectRatio: true,
			aspectRatio: 2,
			scales: {
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						beginAtZero: true
					}
				}],
				yAxes: [{
					barThickness: 50
				}]
			}
		}
	})

	const weeklyActivityHorBar3 = new Chart($('#chart--weeklyactivity-horbar3'), {
		type: 'horizontalBar',
		data: {
			labels: ['Flights'],
			datasets: [{
				label: 'You',
				data: [activityRepo.returnActivity(3).returnActiveDayProperty('21/05/2019', 'flightsOfStairs')],
				backgroundColor: [
					'rgba(11, 204, 207, .3)'
				]
			},
			{
				label: 'Avg User',
				data: [activityRepo.returnAllAvgs('21/05/2019', 'flightsOfStairs')],
				backgroundColor: [
					'rgba(207, 15, 11, .3)'
				]
			}]
		},
		options: {
			defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Fira Sans'",
			responsive: false,
			maintainAspectRatio: true,
			aspectRatio: 2,
			scales: {
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						beginAtZero: true
					}
				}],
				yAxes: [{
					barThickness: 50
				}]
			}
		}
	})


})
