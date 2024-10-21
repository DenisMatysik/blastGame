export class Bonus {
    scene;
    config;

    image;
    marker;
    bonusText;
    bonusValue = 0;
    isBonusActive = false;

    constructor(scene, config, bonusValue, showBonus) {
        this.scene = scene;
        this.config = config;
        this.bonusValue = bonusValue;
        this._createElements(config);
        this._createEvents();
        this.activeDisableBtn(showBonus);
    }

    /**
     * Метод создает элементы поля текущими очками за раунд
     * @private
     **/
    _createElements(config) {
		this.image = this.scene.make
            .image(config.bg)
            .setInteractive({cursor: "pointer"});
        this.bonusText = this.scene.make.text({
            ...config.text,
            text: this.bonusValue
        });
        this.marker = this.scene.make.image(config.marker);
    }

    /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.image.on("pointerup", () => {
            this.showHideBonus(!this.isBonusActive);
            this.scene.activeBonus[this.bonusValue] = this.isBonusActive;

            this.scene.bonuses.filter(bonus => bonus!== this).forEach(bonus => {
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
    showHideBonus(boolean) {
        this.isBonusActive = boolean;
        this.marker.setVisible(boolean);
    }
}