export class Bonus {
    scene;
    config;

    image;
    marker;
    bonusText;
    bonusName;
    bonusCount = 0;
    bonusNumber = 0;
    isBonusActive = false;

    constructor(scene, config, bonusCount, bonusName, bonusNumber) {
        this.scene = scene;
        this.config = config;
        this.bonusCount = bonusCount;
        this.bonusNumber = bonusNumber;
        this._createElements(config, bonusName);
        this._createEvents();
        this.activeDisableBtn(bonusCount > 0);
    }

    /**
     * Метод создает элементы поля текущими очками за раунд
     * @private
     * @param {{string}} config - конфиг с параметрами
     * @param {string} bonusName - название бонуса
     **/
    _createElements(config, bonusName) {
		this.image = this.scene.make
            .image(config.bg)
            .setInteractive({cursor: "pointer"});
        this.bonusText = this.scene.make.text({
            ...config.text,
            text: this.bonusCount
        });
        this.bonusName = this.scene.make.text({
            ...config.bonusName,
            text: bonusName
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
            this.scene.activeBonuses[this.bonusNumber] = this.isBonusActive;

            this.scene.bonuses.filter(bonus => bonus!== this).forEach(bonus => {
                bonus.showHideBonus(false);
                this.scene.activeBonuses[bonus.bonusNumber] = false;
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

    /**
     * Метод уменьшает количество бонусов на 1
     * @public
     **/
    updateBonusCount() {
        this.bonusCount--;
        this.bonusText.setText(this.bonusCount);
        if (this.bonusCount === 0) {
            this.activeDisableBtn(false);
            this.showHideBonus(false);
            this.scene.activeBonuses[this.bonusNumber] = false;
        } 
    }

    /**
     * Метод для сброса всех значений бонуса
     * @public
     * @param {boolean} value - количество бонусов после сброса
     **/
    resetBonus(value) {
        this.bonusText.setText(value);
        this.bonusCount = value;
        this.showHideBonus(false);
        this.activeDisableBtn(value > 0);
    }
}