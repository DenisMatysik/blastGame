export class Loader extends Phaser.Scene {
	constructor() {
		super("Loader");
	}

	preload() {
		this.load.image("background", "assets/imgs/background.png");
		this.load.image("header", "assets/imgs/header.png");
		this.load.image("blue", "assets/imgs/blue.png");
		this.load.image("green", "assets/imgs/green.png");
		this.load.image("purple", "assets/imgs/purple.png");
		this.load.image("red", "assets/imgs/red.png");
		this.load.image("yellow", "assets/imgs/yellow.png");
		this.load.image("btnPause", "assets/imgs/btnPause.png");
		this.load.image("btnClose", "assets/imgs/btnClose.png");
		this.load.image("btnPlus", "assets/imgs/btnPlus.png");
		this.load.image("btnPurple", "assets/imgs/btnPurple.png");
		this.load.image("btnRed", "assets/imgs/btnRed.png");
		this.load.image("progressBg", "assets/imgs/progressBg.png");
		this.load.image("progressFill", "assets/imgs/progressFill.png");
		this.load.image("bonus", "assets/imgs/bonus.png");
		this.load.image("mainField", "assets/imgs/mainField.png");
		this.load.image("redField", "assets/imgs/redField.png");
		this.load.image("purpleField", "assets/imgs/purpleField.png");
		this.load.image("scoreField", "assets/imgs/scoreField.png");
	}

	create() {
		this.scene.launch("MainWindow");
	}
}
