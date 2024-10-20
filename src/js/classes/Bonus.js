export class Bonus {
    scene;
    config;

    image;
    bonusText;
    bonusValue = 0;

    constructor(scene, config, bonusValue) {
        this.scene = scene;
        this.config = config;
        this.bonusValue = bonusValue;
        this._createElements();
        this._createEvents();
        this.activeDisableBtn(this.scene.totalScoreValue >= this.bonusValue);
    }

    /**
     * Метод создает элементы поля текущими очками за раунд
     * @private
     **/
    _createElements() {
		this.image = this.scene.make
            .image(this.config.bg)
            .setInteractive({cursor: "pointer"});
        this.bonusText = this.scene.make.text({
            ...this.config.text,
            text: this.bonusValue
        });
    }

    /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.image.on("pointerup", () => {
            this.isBonusActive = !this.isBonusActive;
            this.showHideBonus(this.isBonusActive);
            this.scene.activeBonus[this.bonusValue] = this.isBonusActive;

            this.scene.bonuses.filter(bonus => bonus!== this).forEach(bonus => {
                bonus.isBonusActive = false;
                bonus.showHideBonus(false);
                this.scene.activeBonus[bonus.bonusValue] = false;
            });
        });
    }

    /**
     * Метод блокировки/разблокировки кнопки
     * @public
     * @param {boolean} state - true(разблокировать)/заблокировать
     **/
    activeDisableBtn(state) {
        state
            ? this.image.setInteractive({cursor: "pointer"}).setAlpha(1)
            : this.image.disableInteractive().setAlpha(0.5);
    }

    /**
     * Метод для выделения/снятия выделения выбора бонуса
     * @public
     * @param {boolean} state - true(разблокировать)/заблокировать
     **/
    showHideBonus() {
        this.isBonusActive 
            ? this.scene.input.enableDebug(this.image, 0xff00ff)
            : this.scene.input.removeDebug(this.image);
    }
}