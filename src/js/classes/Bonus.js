export class Bonus {
    scene;
    config;

    image;
    marker;
    bonusText;
    bonusName;
    bonusCount = 0;
    isBonusActive = false;

    constructor(scene, config, bonusCount, bonusName) {
        this.scene = scene;
        this.config = config;
        this.bonusCount = bonusCount;
        this.bonusName = bonusName;
        this._createElements();
        this._createEvents();
        this.activeDisableBonus(bonusCount > 0);
    }

    /**
     * Метод создает элементы класса Bonus
     * @private
     **/
    _createElements() {
		this.image = this.scene.make
            .image(this.config.bg)
            .setInteractive({cursor: "pointer"});
        this.bonusText = this.scene.make.text({
            ...this.config.text,
            text: this.bonusCount
        });
        this.scene.make.text({
            ...this.config.bonusName,
            text: this.bonusName
        });
        this.marker = this.scene.make.image(this.config.marker);
    }

    /**
     * Метод для создания событий
     * @private
     **/
    _createEvents() {
        this.image.on("pointerup", () => {
            this.scene[this.bonusName === "R" ? "isActiveBonusRadius" : "isActiveBonusLine"] = !this.isBonusActive;
            this.showHideBonus(!this.isBonusActive);
            // Сбрасываю активное состояние предыдущего бонуса
            this.scene[this.bonusName !== "R" ? "bonusRadius" : "bonusLine"].showHideBonus(false);
            this.scene[this.bonusName !== "R" ? "isActiveBonusRadius" : "isActiveBonusLine"] = false;
        });
    }

    /**
     * Метод блокировки/разблокировки кнопки
     * @public
     * @param {boolean} state - true(разблокировать)/заблокировать
     **/
    activeDisableBonus(state) {
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
            this.activeDisableBonus(false);
            this.showHideBonus(false);
            this.scene[this.bonusName === "R" ? "isActiveBonusRadius" : "isActiveBonusLine"] = false;
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
        this.activeDisableBonus(value > 0);
    }

    /**
     * Метод задаст количество бонусов и оотбразит значение
     * @public
     **/
    setBonusCount(value) {
        this.bonusCount += value;
        this.bonusText.setText(this.bonusCount);
    }
}