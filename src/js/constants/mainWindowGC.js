export function config() {
	return {
		bg: {
			x: 0,
			y: 0,
			key: "background",
			origin: 0,
		},
		header: {
			x: 84,
			y: 0,
			key: "header",
			origin: 0,
		},
		progressBar: {
			bg: {
				x: 272,
				y: 0,
				key: "progressBg",
				origin: 0,
			},
			fill: {
				x: 287,
				y: 34,
				key: "progressFill",
				origin: 0,
			},
			text: {
				x: 419,
				y: 8,
				text: "ПРОГРЕСС",
				style: {
					fontSize: "19px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			},
		},
		scoreField: {
			bg: {
				x: 636,
				y: 160,
				key: "scoreField",
				origin: 0
			},
			currentScore: {
				x: 802,
				y: 250,
				text: "37",
				style: {
					fontSize: "70px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: {
					x: 0.5,
					y: 0.5
				}
			},
			scoreDescription: {
				x: 761,
				y: 350,
				text: "ОЧКИ:",
				style: {
					fontSize: "25px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			},
			allScore: {
				x: 802,
				y: 400,
				text: "221",
				style: {
					fontSize: "40px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: {
					x: 0.5,
					y: 0.5
				}
			},
		},
		// btnPause: {
		// 	x: 929,
		// 	y: 6
		// },
		// main: {
		// 	x: 39,
		// 	y: 128
		// },
		// buttons: {
		// 	x: 53,
		// 	y: 141
		// },
		// bonusesText: {
		// 	x: 739,
		// 	y: 490
		// },
		// bonus: {
		// 	x: 624,
		// 	y: 532
		// },
		// btnRed: {
		// 	x: 624,
		// 	y: 667
		// },
		// btnPurple: {
		// 	x: 812,
		// 	y: 667
		// },
		// redField: {
		// 	x: 119,
		// 	y: 17
		// },
		// purpleField: {
		// 	x: 676,
		// 	y: 17
		// },
		// btnPlus: {
		// 	x: 837,
		// 	y: 24
		// }
	};
}