export function config() {
	return {
		winningValue: 1000,
		bg: {
			x: 0,
			y: 0,
			key: "background",
			origin: 0,
		},
		headerElements: {
			bg: {
				x: 84,
				y: 0,
				key: "header",
				origin: 0,
			},
			redField: {
				x: 135,
				y: 32,
				key: "redField",
				origin: 0,
			},
			redFieldText: {
				x: 119,
				y: 10,
				text: "ОСТАЛОСЬ ХОДОВ",
				style: {
					fontSize: "15px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			},
			redFieldValue: {
				x: 204,
				y: 52,
				text: "0",
				style: {
					fontSize: "30px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: {
					x: 0.5,
					y: 0.5
				}
			},
			purpleField: {
				x: 677,
				y: 32,
				key: "purpleField",
				origin: 0,
			},
			purpleFieldText: {
				x: 702,
				y: 10,
				text: "ОБЩИЙ СЧЁТ",
				style: {
					fontSize: "15px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			},
			purpleFieldValue: {
				x: 773,
				y: 52,
				text: "0",
				style: {
					fontSize: "30px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: {
					x: 0.5,
					y: 0.5
				}
			},
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
				text: "0",
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
				text: "0",
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
		blastField: {
			cols: 9,
			rows: 10,
			bg: {
				x: 39,
				y: 128,
				key: "mainField",
				origin: 0,
				scale: {
					x: 1.015,
					y: 1
				}
			},
			blocksName: [
				"green",
				"purple",
				"red",
				"yellow",
				"blue"
			],
			block: {
				initialX: 53,
				initialY: 141,
				width: 51,
				heigth: 57,
				offsetY: 8,
				origin: 0,
				initialDepth: 90
			},
			text: {
				text: "0",
				style: {
					fontSize: "15px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			},
			camera: {
				x: 39,
				y: 128 + 9,
				width: 479,
				heigth: 531,
			}
		},
		// btnPause: {
		// 	x: 929,
		// 	y: 6
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
