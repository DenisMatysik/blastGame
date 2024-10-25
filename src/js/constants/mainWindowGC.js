export function config() {
	return {
		winningValue: 1000,
		blockColors: ["yellow", "purple", "blue", "green", "red"],
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
				x: 722,
				y: 10,
				text: "ОСТАЛОСЬ",
				style: {
					fontSize: "15px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			},
			purpleFieldValue: {
				x: 773,
				y: 52,
				text: "",
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
			block: {
				initialX: 53,
				initialY: 141,
				width: 51,
				heigth: 57,
				offsetY: 8,
				origin: 0,
				initialDepth: 90,
				offsetTextX: 14,
				offsetTextY: 12,
				text: "S",
				style: {
					fontSize: "30px",
					fontFamily: "Marvin",
					color: "#ffffff",
				}
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
			},
			coppyBlock: {
				x: 512,
				y: -57,
				depth: 90,
				origin: 0,
				bonusLineX: 783,
				bonusLineY: 572
			}
		},
		bonusRadius: {
			bg: {
				x: 625,
				y: 532,
				key: "bonus",
				origin: 0
			},
			text: {
				x: 680,
				y: 622,
				style: {
					fontSize: "20px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: {
					x: 0.5,
					y: 0.5
				}
			},
			bonusName: {
				x: 690,
				y: 575,
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
			marker: {
				x: 697,
				y: 613,
				key: "markerActiveBonus",
				origin: 0,
				scale: 1,
				visible: false
			}
		},
		bonusLine: {
			bg: {
				x: 743,
				y: 532,
				key: "bonus",
				origin: 0
			},
			text: {
				x: 798,
				y: 622,
				style: {
					fontSize: "20px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: {
					x: 0.5,
					y: 0.5
				}
			},
			bonusName: {
				x: 808,
				y: 575,
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
			marker: {
				x: 815,
				y: 613,
				key: "markerActiveBonus",
				origin: 0,
				scale: 1,
				visible: false
			}
		},
		// bonusTeleport: {
		// 	bg: {
		// 		x: 861,
		// 		y: 532,
		// 		key: "bonus",
		// 		origin: 0
		// 	},
		// 	text: {
		// 		x: 914,
		// 		y: 622,
		// 		style: {
		// 			fontSize: "20px",
		// 			fontFamily: "Marvin",
		// 			color: "#ffffff",
		// 		},
		// 		origin: {
		// 			x: 0.5,
		// 			y: 0.5
		// 		}
		// 	},
		// 	bonusName: {
		// 		x: 924,
		// 		y: 575,
		// 		style: {
		// 			fontSize: "40px",
		// 			fontFamily: "Marvin",
		// 			color: "#ffffff",
		// 		},
		// 		origin: {
		// 			x: 0.5,
		// 			y: 0.5
		// 		}
		// 	},
		// 	marker: {
		// 		x: 933,
		// 		y: 613,
		// 		key: "markerActiveBonus",
		// 		origin: 0,
		// 		scale: 1,
		// 		visible: false
		// 	}
		// },
		btnPause: {
			x: 929,
			y: 6,
			key: "btnPause",
			origin: 0,
		},
		modalPause: {
			bg: {
				x: 0,
				y: 0,
				key: "background",
				origin: 0,
				alpha: 0.85,
			},
			camera: {
				x: 0,
				y: 0,
				width: 1024,
				heigth: 768,
			},
			btnClose: {
				x: 929,
				y: 6,
				key: "btnClose",
				origin: 0,
			},
			frame: {
				x: 512,
				y: 128,
				key: "mainField",
				origin: {
					x: 0.5,
					y: 0
				},
				scale: {
					x: 0.5,
					y: 0.725
				},
				scale: 1
			},
			scoreText: {
				x: 450,
				y: 140,
				offsetY: 70,
				offsetX: 300,
				text: "ОЧКИ",
				style: {
					fontSize: "35px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: 0
			},
			block: {
				x: 300,
				y: 185,
				origin: 0,
				offsetY: 65,
				offsetX: 300,
			},
			text: {
				x: 395,
				y: 208,
				offsetY: 65,
				offsetX: 300,
				text: "",
				style: {
					fontSize: "45px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: 0.5
			},
			bonusesText: {
				x: 470,
				y: 320,
				offsetY: 70,
				offsetX: 300,
				text: "БОНУСЫ",
				style: {
					fontSize: "40px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: 0
			},
			markerActiveBonus: {
				x: 300,
				y: 385 ,
				key: "markerActiveBonus",
				origin: 0,
				scale: 1,
			},
			textActiveBonus: {
				x: 335,
				y: 380,
				text: "- БОНУС АКТИВИРОВАН",
				style: {
					fontSize: "25px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			},
			bonusRadiusText: {
				x: 300,
				y: 420,
				text: "R - ВЗРЫВ РАДИУСОМ",
				style: {
					fontSize: "25px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: 0
			},
			bonusLineText: {
				x: 300,
				y: 455,
				text: "L - ВЗРЫВ ПО ЛИНИИ (ПОЯВЛЯЕТСЯ ПРИ ВЗРЫВЕ 8 БЛОКОВ ОДНОГО ЦВЕТА)",
				style: {
					fontSize: "25px",
					fontFamily: "Marvin",
					color: "#ffffff",
					wordWrap: { width: 450, useAdvancedWrap: true }
				},
				origin: 0
			},
			superBonusText: {
				x: 300,
				y: 550,
				text: "S - ВЗРЫВ ВСЕГО ПОЛЯ (ПОЯВЛЯЕТСЯ ПРИ ВЗРЫВЕ 12 БЛОКОВ ОДНОГО ЦВЕТА)",
				style: {
					fontSize: "25px",
					fontFamily: "Marvin",
					color: "#ffffff",
					wordWrap: { width: 450, useAdvancedWrap: true }
				},
				origin: 0
			}
		},
		bonusesDescription: {
			x: 800,
			y: 508,
			text: "БОНУСЫ",
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
		modalWinLose: {
			bg: {
				x: 0,
				y: 0,
				key: "background",
				origin: 0,
			},
			camera: {
				x: 0,
				y: 0,
				width: 1024,
				heigth: 768,
			},
			text: {
				x: 512,
				y: 250,
				text: "ВЫ ВЫИГРАЛИ",
				alterText: "ВЫ ПРОИГРАЛИ",
				style: {
					fontSize: "100px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
				origin: 0.5
			},
			btnRefresh: {
				image: {
					x: 512,
					y: 400,
					key: "btnPurple",
					origin: 0.5,
					scale: 2
				},
				text: {
					x: 512,
					y: 400,
					text: "ЗАНОВО",
					style: {
						fontSize: "45px",
						fontFamily: "Marvin",
						color: "#ffffff",
					},
					origin: 0.5
				}
			},
		},
		mixingColors: {
			text: {
				x: 40,
				y: 685,
				text: "ОСТАЛОСЬ ПЕРЕМЕШИВАНИЙ: ",
				style: {
					fontSize: "30px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			},
			textValue: {
				x: 520,
				y: 685,
				text: "1",
				style: {
					fontSize: "30px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			},
			btn: {
				x: 692,
				y: 685,
				key: "btnPlus",
				origin: 0
			},
			description: {
				x: 742,
				y: 685,
				text: "- ПЕРЕМЕШАТЬ",
				style: {
					fontSize: "30px",
					fontFamily: "Marvin",
					color: "#ffffff",
				},
			}
		}
	};
}
