import { ButtonMixing } from "./ButtonMixing";

export class MixingColors {
    scene;
    config;
    mixingColorsCount;
    textValue;

    constructor(scene, config, mixingColorsCount) {
        this.scene = scene;
        this.config = config;
        this.mixingColorsCount = mixingColorsCount;

        this._createElements();
    }

    /**
     * Метод создает элементы класса MixingColors
     * @private
     **/
    _createElements() {
		this.scene.make.text(this.config.text);
		this.textValue = this.scene.make.text({
            ...this.config.textValue,
            text: this.mixingColorsCount
        });
        this.buttonMixing = new ButtonMixing(this.scene, this.config.btn);
        this.scene.make.text(this.config.description);
    }

    /**
     * Метод для обновляния значение оставшихся перемешиваний
     * @public
     **/
	updateMixingColorsText(value) {
		this.textValue.setText(value);
	}

    /**
     * Метод для сброса всех значения поля
     * @public
     **/
    resetMixingColors(value) {
        this.mixingColorsCount = value;
        this.updateMixingColorsText(this.mixingColorsCount);
        this.activeDisableMixingColorsBtn(value > 0);
    }

    /**
     * Метод для блокировки/разблокировки кнопки buttonMixing
     * @public
     * @param {boolean} state - true(разблокировать)/false(блокировать)
     **/
    activeDisableMixingColorsBtn(state) {
        this.buttonMixing.activeDisableBtn(state);
    }
}