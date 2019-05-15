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
		$('.step-goal-message').text(`The average Activity Tracker user set a goal of ${avgSteps} steps per day. Your goal of ${userSteps} is ${userSteps > avgSteps ? 'above' : 'below'} average.`);
	}

	function populateHydrationCard() {
		populateHydrationInfo();
		populateTodayHydration();
	}

	function populateHydrationInfo() {
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
		populateSleepWeek('21/05/2019');
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

	function populateSleepWeek(givenDate) {
		const spanHours = $.makeArray($('.li--span-hours'));
		const spanQuals = $.makeArray($('.li--span-quality'));
		const hoursInfo = Object.values(sleepRepo.returnSleep(3).returnSleepWeek(givenDate));
		const qualInfo = Object.values(sleepRepo.returnSleep(3).returnQualWeek(givenDate));
		for (let i = 0; i < hoursInfo.length; i++) {
			$(spanHours[i]).text(hoursInfo[i]);
			$(spanQuals[i]).text(qualInfo[i]);
		}
	}

	function populateActivityCard() {
		populateActivityTitles(".h4--activity-steps", '21/05/2019', 'numSteps');
		populateActivityTitles(".h4--activity-minutes",'21/05/2019', 'minutesActive');
		populateMilesTitle('21/05/2019');
		populateActivityTable('21/05/2019');
		populateActivityWeek('21/05/2019');
	}

	function populateActivityTitles(selector, givenDate, property) {
	$(selector).text(activityRepo.returnActivity(3).returnActiveDayProperty(givenDate, property));
}

	function populateMilesTitle(givenDate) {
		$(".h4--activity-miles").text(activityGoalsRepo.returnActivityGoal(3).returnStepsToMiles(givenDate));
	}

	function populateActivityTable(givenDate) {
		const userStat = $.makeArray($('.td--activity-user'));
		const avgStat = $.makeArray($('.td--activity-all'));
		const userData = [
			activityRepo.returnActivity(3).returnActiveDayProperty(givenDate, 'numSteps'),
			activityRepo.returnActivity(3).returnActiveDayProperty(givenDate, 'minutesActive'),
			activityRepo.returnActivity(3).returnActiveDayProperty(givenDate, 'flightsOfStairs')
		];
		const avgData = [
			activityRepo.returnAllAvgs(givenDate, 'numSteps'),
			activityRepo.returnAllAvgs(givenDate, 'minutesActive'),
			activityRepo.returnAllAvgs(givenDate, 'flightsOfStairs')
		]
		for (let i = 0; i < userStat.length; i++) {
			$(userStat[i]).text(userData[i]);
			$(avgStat[i]).text(avgData[i]);
		}
	}

	function populateActivityWeek(givenDate) {
		$(".h5--weekly-steps").text(activityRepo.returnAllAvgs(givenDate, 'numSteps'));
		$(".h5--weekly-minutes").text(activityRepo.returnAllAvgs(givenDate, 'minutesActive'));
		$(".h5--weekly-stairs").text(activityRepo.returnAllAvgs(givenDate, 'flightsOfStairs'));
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
					'#45A29E',
					'#45A29E',
					'#45A29E',
					'#45A29E',
					'#45A29E',
					'#45A29E',
					'#C5C6C7'
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
        responsive: false,
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
			labels: ['Steps Taken'],
			datasets: [{
				label: 'Your Activity',
				data: [activityRepo.returnActivity(3).returnActiveDayProperty('21/05/2019', 'numSteps')],
				backgroundColor: [
					'rgba(11, 204, 207, .3)',
				]
			},
			{
				label: 'Avg User Activity',
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
				}]
			}
		}
	})

	const weeklyActivityHorBar2 = new Chart($('#chart--weeklyactivity-horbar2'), {
		type: 'horizontalBar',
		data: {
			labels: ['Minutes Active'],
			datasets: [{
				label: 'Your Activity',
				data: [activityRepo.returnActivity(3).returnActiveDayProperty('21/05/2019', 'minutesActive'),],
				backgroundColor: [
					'rgba(11, 204, 207, .3)'
				]
			},
			{
				label: 'Avg User Activity',
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
				}]
			}
		}
	})

	const weeklyActivityHorBar3 = new Chart($('#chart--weeklyactivity-horbar3'), {
		type: 'horizontalBar',
		data: {
			labels: ['Flights Climbed'],
			datasets: [{
				label: 'Your Activity',
				data: [activityRepo.returnActivity(3).returnActiveDayProperty('21/05/2019', 'flightsOfStairs')],
				backgroundColor: [
					'rgba(11, 204, 207, .3)'
				]
			},
			{
				label: 'Avg User Activity',
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
				}]
			}
		}
	})


})
